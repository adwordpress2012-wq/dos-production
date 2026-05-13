import { redirect } from "next/navigation";

const CALENDLY_DEMO_URL = "https://calendly.com/adwordpress2012/dos-ai-business-system-demo";

export default function BookDemoPage() {
  redirect(CALENDLY_DEMO_URL);
}
