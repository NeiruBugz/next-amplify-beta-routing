export const segmentTrack = (event: string, message?: any) => {
    global.analytics.track(event, { message: message });
};

export const segmentIdentify = (id: string, user: any) => {
    global.analytics.identify(id, user)
};