function gatherCandidates(pc: RTCPeerConnection): Promise<void> {
    console.log('gathering....')

    return new Promise((resolve) => {
        if (pc.iceGatheringState === 'complete') {
            resolve();
        } else {
            function checkState() {
                if (pc.iceGatheringState === 'complete') {
                    pc.removeEventListener('icegatheringstatechange', checkState);
                    console.log('gathered')
                    resolve();
                }
            }
            pc.addEventListener('icegatheringstatechange', checkState);
        }
    });
}

export default gatherCandidates;