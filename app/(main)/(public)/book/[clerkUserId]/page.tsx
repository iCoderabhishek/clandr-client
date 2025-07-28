import PublicProfile from "@/components/PublicEventCard";
import { publicBookingApi } from "@/lib/api";

export default async function PublicProfilePage({
  params,
}: {
  params: { clerkUserId: string };
}) {
  const { clerkUserId } = params;

  // Fetch public events via external API
  const publicEvents = await publicBookingApi.getUserPublicEvents(clerkUserId);

  // Fetch user profile from API or hardcode for now if not exposed
  const user = {
    fullName: publicEvents[0]?.name || "User", // fallback fullName
  };

  return (
    <PublicProfile
      userId={clerkUserId}
      fullName={user.fullName}
      events={publicEvents}
    />
  );
}
