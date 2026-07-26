import React from 'react';
import { Box, Container, Stack, Text, HStack, IconButton, useColorModeValue } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { PROFILE_DATA } from '../data/profile';

export const Footer: React.FC = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.800');
  const textColor = useColorModeValue('gray.500', 'gray.500');

  return (
    <Box
      as="footer"
      mt={20}
      borderTop="1px solid"
      borderColor={borderColor}
      py={8}
    >
      <Container maxW="6xl">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify="space-between"
          align="center"
        >
          <Text fontSize="xs" color={textColor}>
            © {new Date().getFullYear()} {PROFILE_DATA.name}. Built with React & Chakra UI.
          </Text>

          <HStack spacing={2}>
            <IconButton
              as="a"
              href={PROFILE_DATA.socials.github}
              target="_blank"
              aria-label="GitHub"
              icon={<FaGithub />}
              variant="ghost"
              size="xs"
            />
            <IconButton
              as="a"
              href={PROFILE_DATA.socials.linkedin}
              target="_blank"
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              variant="ghost"
              size="xs"
            />
            <IconButton
              as="a"
              href={PROFILE_DATA.socials.email}
              aria-label="Email"
              icon={<FaEnvelope />}
              variant="ghost"
              size="xs"
            />
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
};
