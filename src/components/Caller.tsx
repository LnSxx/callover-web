// import React, { useCallback, useContext, useEffect } from 'react'
// import { useState } from 'react'
// import { Avatar, Box, Flex, Heading, IconButton, Spacer, Text } from '@chakra-ui/react'
// import { MdCall } from 'react-icons/md'
// import gatherCandidates from '../functions/gather_candidates'
// import ConnectionStatus from '../constants/ConnectionStatus'
// import Header from './Header'
// import { CallerWSContext } from '../contexts/serverConnectionService'
// import { CallerRTCContext } from '../contexts/rtcConnectionContext'

// function Caller() {
//     const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(ConnectionStatus.Connecting)
//     const ws = useContext(CallerWSContext)
//     const pc = useContext(CallerRTCContext)

//     const onAnswer = useCallback((data: any) => {
//         pc.connection!.setRemoteDescription(data)
//         console.log('Connection established')
//     }, [pc])

//     const startCall = useCallback(async () => {
//         console.log('starting call')
//         const connection = new RTCPeerConnection();
//         const dc = connection.createDataChannel('chat', { "ordered": true });

//         dc.addEventListener('close', () => {
//             console.log('- close\n');
//         });
//         dc.addEventListener('open', () => {
//             console.log('- open\n')
//             dc.send("PIZDA")

//         });
//         dc.addEventListener('message', (evt) => {
//             console.log('< ' + evt.data + '\n')
//         });

//         const offer = await connection.createOffer();
//         connection.setLocalDescription(offer);

//         await gatherCandidates(connection);

//         ws.connection!.send(
//             JSON.stringify(
//                 {
//                     'type': 'offer',
//                     'sdp': offer.sdp,
//                 }
//             )
//         )

//         pc.setConnection(connection)
//     }, [pc, ws])

//     useEffect(() => {
// const socket = new WebSocket('ws://localhost:9000/ws?isCaller=true')

// socket.onmessage = async (event) => {
//     const data = JSON.parse(JSON.parse(event.data))
//     if (data['type'] === 'answer') {
//         onAnswer(data)
//     }
// }
// socket.onopen = () => {
//     setConnectionStatus(ConnectionStatus.Online);
// }
// socket.onclose = () => {
//     setConnectionStatus(ConnectionStatus.Offline);
// }
// socket.onerror = () => {
//     setConnectionStatus(ConnectionStatus.Offline);
// }

//         ws.setConnection(socket)

//         return function () {
//             if (ws != null) {
//                 ws.close()
//             }
//         };
//     }, []);

//     return (
//         <Box w='100vw' bgColor=''>
//             <Header connectionStatus={connectionStatus} />
//             <Box padding="4">
//                 <Flex align="start" flexDirection='column'>
//                     <Heading paddingBottom={5}>
//                         Contacts
//                     </Heading>
//                     <Flex gap='4' alignItems='center'>
//                         <Avatar name='Daniil Fediaev' src='https://cv.daniilf.me/img/avatar.jpg' />
//                         <Box>
//                             <Heading size='sm'>Daniil Fediaev</Heading>
//                             <Text>Chakra UI</Text>
//                         </Box>
//                         <Spacer />
//                         <IconButton
//                             onClick={startCall}
//                             colorScheme='green'
//                             aria-label='Call'
//                             size='md'
//                             icon={<MdCall />}
//                         />
//                     </Flex>
//                 </Flex>
//             </Box >
//         </Box >
//     )
// }

// export default Caller
