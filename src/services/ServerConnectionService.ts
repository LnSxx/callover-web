import ConnectionStatus from "../constants/ConnectionStatus";
import gatherCandidates from "../functions/gather_candidates";

interface ServerConnectionServiceConfiguration {
    user: string;
    onDataChannelClose: (ev: Event) => any;
    onDataChannelOpen: (ev: Event) => any;
    onDataChannelMessage: (ev: MessageEvent<any>) => any;
}

class ServerConnectionService {
    connection: RTCPeerConnection | null;
    datachannel: RTCDataChannel | null;
    user: string;
    onDataChannelClose: (ev: Event) => any;
    onDataChannelOpen: (ev: Event) => any;
    onDataChannelMessage: (ev: MessageEvent<any>) => any;


    constructor(
        {
            user,
            onDataChannelClose,
            onDataChannelOpen,
            onDataChannelMessage,
        }: ServerConnectionServiceConfiguration
    ) {
        this.user = user
        this.onDataChannelClose = onDataChannelClose
        this.onDataChannelOpen = onDataChannelOpen
        this.onDataChannelMessage = onDataChannelMessage
        this.init();
    }

    private async init() {
        const conn = new RTCPeerConnection();

        conn.addEventListener('connectionstatechange', (_) => this.handleConnectionStateChange());

        const dc = conn.createDataChannel('chat', { "ordered": true });

        dc.addEventListener('close', (event) => this.onDataChannelClose(event));
        dc.addEventListener('open', (event) => this.onDataChannelOpen(event))
        dc.addEventListener('message', (event) => this.onDataChannelOpen(event));

        const offer = await conn.createOffer();
        conn.setLocalDescription(offer);

        await gatherCandidates(conn);

        const result = await fetch(
            'http://localhost:9000/connect',
            {
                body: JSON.stringify({
                    sdp: offer.sdp,
                    type: offer.type,
                    user_id: this.user,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )

        const resultJson = await result.json();

        const answer = {
            sdp: resultJson.sdp,
            type: resultJson.type,
        }

        conn.setRemoteDescription(answer);

        this.setConnection(conn);
        this.setDataChannel(dc);
    }

    private setConnection(conn: RTCPeerConnection) {
        this.connection = conn;
    }

    private setDataChannel(channel: RTCDataChannel) {
        this.datachannel = channel;
    }

    private handleConnectionStateChange() { }

    close() {
        this.connection!.close()
    }
}

export default ServerConnectionService;