import { redirect } from "next/navigation";

import { DISCOVERY_CALL_HREF } from "../lib/booking";

export default function Page() {
  redirect(DISCOVERY_CALL_HREF);
}
