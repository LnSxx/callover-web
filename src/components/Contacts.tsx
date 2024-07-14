import React from 'react'
import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Spacer, Text } from '@chakra-ui/react'
import { GiBugleCall } from 'react-icons/gi';
import { MdCall } from 'react-icons/md';

function Contacts() {
    return (
        <Box padding="4">
            <Flex align="start" flexDirection='column'>
                <Heading paddingBottom={5}>
                    Contacts
                </Heading>
                <Flex gap='4' alignItems='center'>
                    <Avatar name='Daniil Fediaev' src='https://cv.daniilf.me/img/avatar.jpg' />
                    <Box>
                        <Heading size='sm'>Daniil Fediaev</Heading>
                        <Text>Chakra UI</Text>
                    </Box>
                    <Spacer />
                    <IconButton
                        colorScheme='green'
                        aria-label='Call'
                        size='md'
                        icon={<MdCall />}
                    />
                </Flex>
            </Flex>
        </Box >
    );
}

export default Contacts