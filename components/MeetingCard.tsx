"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { avatarImages } from "@/constants";
import { useToast } from "./ui/use-toast";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  title,
  date,
  icon,
  isPreviousMeeting,
  buttonIcon1,
  buttonText,
  handleClick,
  link,
}: MeetingCardProps) => {
  const { toast } = useToast();

  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark1 px-5 py-8 xl:max-w-[568px]">
      {/* Header */}
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={28} height={28} />

        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>

      {/* Avatars */}
      <article className="flex items-center gap-3">
        <div className="flex items-center gap-2 overflow-x-auto max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className="rounded-full shrink-0"
            />
          ))}
        </div>

        <div className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-dark2 bg-dark2 text-white text-sm">
          +5
        </div>
      </article>

      {/* Buttons */}
      <article>
        <div className="flex gap-3">
          {buttonIcon1 && (
            <Button onClick={handleClick}>
              <Image
                src={buttonIcon1}
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; {buttonText}
            </Button>
          )}

          <Button
            onClick={() => {
              navigator.clipboard.writeText(link);
              toast({
                title: "Link Copied",
              });
            }}
            className="bg-dark2 px-6"
          >
            <Image src="/icons/copy.svg" alt="feature" width={20} height={20} />
            &nbsp; Copy Link
          </Button>
        </div>
      </article>
    </section>
  );
};

export default MeetingCard;
