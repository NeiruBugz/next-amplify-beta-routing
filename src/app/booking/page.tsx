import { Form } from "@/components/ui/form";
import { SegmentClient } from "@/components/ui/segment-client";

export default function Booking() {
  return (
    <SegmentClient>
      <div className="flex h-full items-center justify-center">
        <Form />
      </div>
    </SegmentClient>
  );
}
