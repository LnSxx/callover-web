import React from 'react'
import { Spinner, Text } from '@chakra-ui/react'
import ConnectionStatus from '../constants/ConnectionStatus';

interface ConnectionStatusBadgeProps {
    connectionStatus: ConnectionStatus,
}

function ConnectionStatusBadge({
    connectionStatus
}: ConnectionStatusBadgeProps) {
    switch (connectionStatus) {
        case ConnectionStatus.Connecting:
            return <>
                <Text fontSize="md" paddingRight={2} textShadow='0px 1px #4A5568'>
                    Connecting
                </Text>
                <Spinner size='xs' />
            </>
        case ConnectionStatus.Offline:
            return <>
                <Text fontSize="md" color='#F56565' >
                    Offline
                </Text>
            </>
        case ConnectionStatus.Error:
            return <>
                <Text fontSize="md" color='#F56565' >
                    Error
                </Text>
            </>
        default:
            return < Text fontSize="md" color='#38A169'>
                Online
            </Text >;
    }
}

export default ConnectionStatusBadge