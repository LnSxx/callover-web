import React, { useCallback, useState } from 'react'
import { ServerConnectionContext } from './contexts/serverConnectionContext';
import ServerConnectionService from './services/ServerConnectionService';
import Callee from './components/Callee';
import { Button, Card, CardBody, CardHeader, Center, Flex, Heading, Input, InputGroup, InputRightElement, Spacer, useColorMode } from '@chakra-ui/react';
import { FcCallTransfer } from 'react-icons/fc';

function App() {
  const [dc, setDc] = useState<RTCDataChannel | null>(null)
  const [user, setUser] = useState<string>('')

  const connectToServer = useCallback(() => {
    const connection = new ServerConnectionService(
      {
        user: user,
        onDataChannelClose: (event) => {
          setDc(null)
        },
        onDataChannelOpen: (event) => {
          connection.datachannel?.send('CLIENT OPENED')
          setDc(connection.datachannel)
        },
        onDataChannelMessage: (event) => {
          connection.datachannel?.send('MESSAGE FORM SERVER')

          console.log(event)
        },
      }
    )
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value), []);

  return (
    <Center h='100vh' w='100vw'>
      <Card boxShadow='outline'>
        <CardHeader>
          <Flex align='center'>
            <Heading size='md'>Welcome to Callover</Heading>
            <Spacer />
            <FcCallTransfer size={32} />
          </Flex>
        </CardHeader>
        <CardBody>
          <InputGroup size='md'>
            <Input
              pr='4.5rem'
              type='text'
              placeholder='Username'
              value={user}
              onChange={handleInputChange}
            />
            <InputRightElement width='4.5rem'>
              <Button colorScheme='cyan' h='1.75rem' size='sm' onClick={connectToServer}>
                Connect
              </Button>
            </InputRightElement>
          </InputGroup>
        </CardBody>
      </Card>
    </Center>
  )
}

export default App