"use server"

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apikey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    try {
        console.log('Token provider called - checking environment variables...');
        
        if (!apikey) {
            console.error('Stream API key is missing');
            throw new Error('Stream API key is missing. Please check your environment variables.');
        }
        
        if (!apiSecret) {
            console.error('Stream API secret is missing');
            throw new Error('Stream API secret is missing. Please check your environment variables.');
        }

        console.log('Environment variables found, getting current user...');
        const user = await currentUser();

        if (!user) {
            console.error('No user found in token provider - this might be a server context issue');
            // Instead of throwing an error, return a placeholder token or handle gracefully
            throw new Error('User authentication required. Please sign in and try again.');
        }

        console.log('User found, creating Stream client...', { userId: user.id });
        const Client = new StreamClient(apikey, apiSecret);

        const exp = Math.floor(new Date().getTime() / 1000) + 60 * 60;
        const issued = Math.floor(Date.now() / 1000) - 60;
        const token = Client.createToken(user.id, exp, issued);

        console.log('Token created successfully');
        return token;
    } catch (error) {
        console.error('Token provider error:', error);
        throw new Error(`Token provider failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}