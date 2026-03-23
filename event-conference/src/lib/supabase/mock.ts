import {
  attendees,
  dashboardMetrics,
  event,
  schedule,
  speakers,
  ticketTiers,
} from "@/lib/mock-data";

const delay = async () => {
  await Promise.resolve();
};

export async function getMarketingData() {
  await delay();
  return {
    event,
    speakers,
    schedule,
    ticketTiers,
  };
}

export async function getAdminDashboardData() {
  await delay();
  return {
    metrics: dashboardMetrics,
    attendees,
    capacity: event.capacity,
  };
}

export async function getAttendees() {
  await delay();
  return attendees;
}

export async function getScheduleWithSpeakers() {
  await delay();
  return { talks: schedule, speakers };
}
