import ConnectionStatus from "../constants/ConnectionStatus";
import gatherCandidates from "../functions/gather_candidates";

class CallService {
    dataChannel: RTCDataChannel;

    constructor(
        dataChannel: RTCDataChannel,
    ) {
        this.dataChannel = dataChannel;
    }

    private async init() {
        const conn = new RTCPeerConnection();

        conn.addEventListener('connectionstatechange', (_) => this.handleConnectionStateChange())

        const dc = conn.createDataChannel('chat', { "ordered": true });

        dc.addEventListener('close', () => {
            console.log('- close\n');
        });
        dc.addEventListener('open', () => {
            console.log('- open\n')
        });
        dc.addEventListener('message', (evt) => {
            console.log('< ' + evt.data + '\n')
        });

        const offer = await conn.createOffer();
        conn.setLocalDescription(offer);

        await gatherCandidates(conn);

        const result = await fetch(
            'http://localhost:9000/connect',
            {
                body: JSON.stringify({
                    sdp: offer.sdp,
                    type: offer.type,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )

        const resultJson = await result.json()

        const answer = {
            sdp: resultJson.sdp,
            type: resultJson.type,
        }

        conn.setRemoteDescription(answer);

        this.setConnection(conn)
    }

    private setConnection(conn: RTCPeerConnection) {
        this.connection = conn;
    }

    private setStatus(newStatus: ConnectionStatus) {
        this.status = newStatus;
    }

    private handleConnectionStateChange() {
        switch (this.connection?.connectionState) {
            case "new":
            case "connecting":
                this.setStatus(ConnectionStatus.Connecting);
                break;
            case "connected":
                this.setStatus(ConnectionStatus.Online);
                break;
            default:
                this.setStatus(ConnectionStatus.Offline);
        }
    }

    close() {
        this.connection!.close()
    }
}

export default CallService;