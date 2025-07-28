import { publicBookingApi } from "@/lib/api";
import { AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MeetingForm from "@/components/forms/MeetingForm";
import NoTimeSlots from "@/components/NoTimeSlots";

export default async function BookingPage({
  params,
}: {
  params: { clerkUserId: string; eventId: string };
}) {
  const { clerkUserId, eventId } = params;

  // Call public API to get booking availability
  let bookingData;
  try {
    bookingData = await publicBookingApi.getBookingAvailability(
      clerkUserId,
      eventId
    );
  } catch (err) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md flex items-center gap-2 text-sm max-w-md mx-auto mt-6">
        <AlertTriangle className="w-5 h-5" />
        <span>This event doesn&apos;t exist or failed to load.</span>
      </div>
    );
  }

  const { event, user, validTimes } = bookingData;

  if (validTimes.length === 0) {
    return <NoTimeSlots event={event} calendarUser={user} />;
  }

  return (
    <Card className="max-w-4xl mx-auto border-8 border-blue-200 shadow-2xl shadow-accent-foreground">
      <CardHeader>
        <CardTitle>
          Book {event.name} with {user.fullName}
        </CardTitle>
        {event.description && (
          <CardDescription>{event.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <MeetingForm
          validTimes={validTimes}
          eventId={event.id}
          clerkUserId={clerkUserId}
        />
      </CardContent>
    </Card>
  );
}
