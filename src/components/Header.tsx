import React from 'react'
import { Box, Container, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import ConnectionStatusBadge from './ConnectionStatusBadge';
import ConnectionStatus from '../constants/ConnectionStatus';

interface HeaderProps {
    connectionStatus: ConnectionStatus,
}

function Header({
    connectionStatus
}: HeaderProps) {
    return (
        <Box bg="blue.900" color="white" padding="4" boxShadow='dark-lg'>
            <Flex align="center">
                <Heading textShadow='0px 1px #4A5568'>
                    Callover
                </Heading>
                <Spacer />
                <Text marginLeft="auto" fontSize="md" color='#CBD5E0' textShadow='0px 1px #4A5568' paddingRight={1}>
                    Connection status:
                </Text>
                <ConnectionStatusBadge connectionStatus={connectionStatus} />
            </Flex>
        </Box>
    );
}

export default Header