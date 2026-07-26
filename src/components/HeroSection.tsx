import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  HStack,
  Avatar,
  useColorModeValue,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import { SiGooglescholar, SiOrcid } from 'react-icons/si';
import { PROFILE_DATA } from '../data/profile';
import { Link } from 'react-router-dom';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionButton = motion(Button);

export const HeroSection: React.FC = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const subheadColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <MotionBox
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      py={8}
    >
      <Box
        p={{ base: 6, md: 10 }}
        borderRadius="xl"
        bg={cardBg}
        border="1px solid"
        borderColor={borderColor}
        boxShadow="sm"
      >
        <MotionFlex
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'center', md: 'flex-start' }}
          gap={8}
        >
          {/* Avatar column - fills full card height */}
          <Box
            w={{ base: "auto", md: "260px" }}
            flexShrink={0}
            alignSelf="stretch"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              w={{ base: "128px", md: "220px" }}
              h={{ base: "128px", md: "220px" }}
              name={PROFILE_DATA.name}
              src={PROFILE_DATA.avatar}
              border="1px solid"
              borderColor={borderColor}
            />
          </Box>

          {/* Profile Details */}
          <Stack spacing={4} flex={1} textAlign={{ base: 'center', md: 'left' }}>
            <Box>
              <Heading
                as="h1"
                size="2xl"
                fontWeight="bold"
                letterSpacing="tight"
                color={useColorModeValue('gray.900', 'white')}
              >
                {PROFILE_DATA.name}
              </Heading>

              <HStack
                justify={{ base: 'center', md: 'flex-start' }}
                spacing={4}
                mt={2}
                fontSize="sm"
                fontWeight="medium"
                flexWrap="wrap"
              >
                <HStack
                  bg={useColorModeValue('blackAlpha.50', 'whiteAlpha.100')}
                  px={3}
                  py={1}
                  borderRadius="full"
                  color={useColorModeValue('gray.800', 'gray.200')}
                >
                  <Icon as={FaBriefcase} />
                  <Text fontWeight="semibold">{PROFILE_DATA.title}</Text>
                </HStack>
                <HStack color={subheadColor}>
                  <Icon as={FaMapMarkerAlt} />
                  <Text>{PROFILE_DATA.location}</Text>
                </HStack>
              </HStack>
            </Box>

            <Text fontSize="md" color={textColor} lineHeight="relaxed">
              {PROFILE_DATA.bio}
            </Text>

            {/* Action Buttons */}
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              spacing={3}
              pt={2}
              justify={{ base: 'center', md: 'flex-start' }}
            >
              <Link to="/projects">
                <MotionButton
                  variant="solid"
                  size="sm"
                  w={{ base: 'full', sm: 'auto' }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  View Projects
                </MotionButton>
              </Link>
              <MotionButton
                as="a"
                href={PROFILE_DATA.socials.email}
                leftIcon={<FaEnvelope />}
                variant="outline"
                size="sm"
                w={{ base: 'full', sm: 'auto' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                Email
              </MotionButton>
            </Stack>

            {/* Social Links */}
            <HStack justify={{ base: 'center', md: 'flex-start' }} spacing={3} pt={1}>
              <MotionButton
                as="a"
                href={PROFILE_DATA.socials.github}
                target="_blank"
                leftIcon={<FaGithub />}
                size="xs"
                variant="ghost"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                GitHub
              </MotionButton>
              <MotionButton
                as="a"
                href={PROFILE_DATA.socials.linkedin}
                target="_blank"
                leftIcon={<FaLinkedin />}
                size="xs"
                variant="ghost"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                LinkedIn
              </MotionButton>
              <MotionButton
                as="a"
                href={PROFILE_DATA.socials.googleScholar}
                target="_blank"
                leftIcon={<SiGooglescholar />}
                size="xs"
                variant="ghost"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                Scholar
              </MotionButton>
              <MotionButton
                as="a"
                href={PROFILE_DATA.socials.orcid}
                target="_blank"
                leftIcon={<SiOrcid />}
                size="xs"
                variant="ghost"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                ORCID
              </MotionButton>
            </HStack>
          </Stack>
        </MotionFlex>
      </Box>
    </MotionBox>
  );
};
