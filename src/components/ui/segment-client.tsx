"use client";

// May be used for Segment context/something else for track actions, e.g. url tracking (but page event is sending anyways)
export function SegmentClient({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}
