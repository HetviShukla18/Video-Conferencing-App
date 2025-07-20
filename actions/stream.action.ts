"use server"

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apikey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            throw new Error('User is not logged in');
        }
        
        if (!apikey) {
            throw new Error('Stream API key is missing. Please check your environment variables.');
        }
        
        if (!apiSecret) {
            throw new Error('Stream API secret is missing. Please check your environment variables.');
        }

        const Client = new StreamClient(apikey, apiSecret);

        const exp = Math.floor(new Date().getTime() / 1000) + 60 * 60;
        const issued = Math.floor(Date.now() / 1000) - 60;
        const token = Client.createToken(user.id, exp, issued);

        return token;
    } catch (error) {
        console.error('Token provider error:', error);
        throw new Error(`Token provider failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}