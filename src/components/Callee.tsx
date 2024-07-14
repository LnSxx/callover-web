import React, { useCallback, useContext, useEffect } from 'react'
import { useState } from 'react'
import { Avatar, Box, Flex, Heading, IconButton, Spacer, Text } from '@chakra-ui/react'
import { MdCall } from 'react-icons/md'
import gatherCandidates from '../functions/gather_candidates'
import ConnectionStatus from '../constants/ConnectionStatus'
import Header from './Header'
import { ServerConnectionContext } from '../contexts/serverConnectionContext'

function Callee() {
    const status = useContext(ServerConnectionContext)
    // const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(ConnectionStatus.Connecting)
    // const ws = useContext(CallerWSContext)
    // const pc = useContext(CallerRTCContext)

    // useEffect(() => {
    //     const socket = new WebSocket('ws://localhost:9000/ws?isCaller=false')

    //     socket.onmessage = async (event) => {
    //         const data = JSON.parse(JSON.parse(event.data))

    //         if (data['type'] === 'offer') {
    //             console.log('got offer from server')
    //             answer(data, socket)
    //         }
    //     }
    //     socket.onopen = () => {
    //         setConnectionStatus(ConnectionStatus.Online);
    //     }
    //     socket.onclose = () => {
    //         setConnectionStatus(ConnectionStatus.Offline);
    //     }
    //     socket.onerror = () => {
    //         setConnectionStatus(ConnectionStatus.Offline);
    //     }

    //     ws.setConnection(socket)

    //     return function () {
    //         if (ws != null) {
    //             ws.close()
    //         }
    //     };
    // }, []);

    // async function answer(data: any, socket: WebSocket) {
    //     const connection = new RTCPeerConnection();

    //     connection.addEventListener('datachannel', (evt) => {
    //         evt.channel.addEventListener('message', (messageEvent) => {
    //             console.log(messageEvent.data)
    //         })
    //     });

    //     connection.setRemoteDescription(data)
    //     console.log('setRemoteDescription')
    //     const answer = await connection.createAnswer()
    //     connection.setLocalDescription(answer)

    //     await gatherCandidates(connection);

    //     socket.send(
    //         JSON.stringify(
    //             {
    //                 'type': 'answer',
    //                 'sdp': connection!.localDescription!.sdp,
    //             }
    //         )
    //     )

    //     pc.setConnection(connection)
    // }

    return (
        <Box w='100vw' bgColor=''>
            <Header connectionStatus={status.status} />
            <Box padding="4">
                <Flex align="start" flexDirection='column'>
                    <Heading paddingBottom={5}>
                        Contacts
                    </Heading>
                </Flex>
            </Box >
        </Box >
    )
}

export default Callee
