import React from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Tag,
  useColorModeValue,
  Icon,
  Link as ChakraLink,
  Flex,
  Wrap,
  Image,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FaBriefcase,
  FaFlask,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChalkboardTeacher,
} from 'react-icons/fa';
import { PROFILE_DATA, Experience } from '../data/profile';
import { useCardHover } from './ui/hover-card';

const MotionBox = motion(Box);

// Map organizations to background color and text color for the logo box
const ORG_COLORS: Record<string, { bg: string; text: string; abbr: string }> = {
  ByteDance: { bg: '#000000', text: '#ffffff', abbr: 'BD' },
  'University of Illinois Urbana-Champaign': { bg: '#E84A27', text: '#ffffff', abbr: 'UIUC' },
  NVIDIA: { bg: '#76B900', text: '#ffffff', abbr: 'NV' },
  Tencent: { bg: '#1DA462', text: '#ffffff', abbr: 'TC' },
};

const CompanyLogo: React.FC<{ org: string; logo?: string }> = ({ org, logo }) => {
  const fallbackBg = useColorModeValue('gray.200', 'gray.700');
  const fallbackColor = useColorModeValue('gray.600', 'gray.300');

  if (logo) {
    return (
      <Image
        src={logo}
        alt={org}
        boxSize="52px"
        objectFit="contain"
        borderRadius="md"
        border="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        p={1}
        bg="white"
      />
    );
  }

  const orgConfig = ORG_COLORS[org];
  const bg = orgConfig?.bg ?? fallbackBg;
  const color = orgConfig?.text ?? fallbackColor;
  const abbr = orgConfig?.abbr ?? org.slice(0, 2).toUpperCase();

  return (
    <Box
      boxSize="52px"
      borderRadius="md"
      bg={bg}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Text fontSize="10px" fontWeight="bold" color={color} letterSpacing="tight" textAlign="center">
        {abbr}
      </Text>
    </Box>
  );
};

const getTypeIcon = (type: Experience['type']) => {
  switch (type) {
    case 'fulltime':
      return FaBriefcase;
    case 'internship':
      return FaBriefcase;
    case 'teaching':
      return FaChalkboardTeacher;
    case 'research':
      return FaFlask;
    default:
      return FaBriefcase;
  }
};

export const TimelineSection: React.FC = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const lineColor = useColorModeValue('gray.300', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');
  const dotBg = useColorModeValue('gray.800', 'gray.300');
  const dotBorder = useColorModeValue('gray.100', 'gray.900');
  const metaColor = useColorModeValue('gray.500', 'gray.400');
  const orgColor = useColorModeValue('blue.600', 'blue.300');
  const sideTextColor = useColorModeValue('gray.500', 'gray.400');
  const bulletBg = useColorModeValue('gray.400', 'gray.500');

  const experiences = PROFILE_DATA.experiences;
  const cardHover = useCardHover();

  return (
    <Box py={8}>
      <Heading as="h2" size="lg" mb={8} letterSpacing="tight" fontWeight="bold">
        Experience & Teaching
      </Heading>

      <VStack spacing={0} align="stretch">
        {experiences.map((exp, index) => (
          <MotionBox
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.07 }}
          >
            <Flex>
              {/* LEFT: Logo + date metadata */}
              <Box
                w={{ base: 0, md: '160px' }}
                minW={{ base: 0, md: '160px' }}
                display={{ base: 'none', md: 'flex' }}
                flexDirection="column"
                alignItems="flex-end"
                pr={5}
                pt="14px"
                gap={2}
              >
                <CompanyLogo org={exp.organization} logo={exp.logo} />
                <VStack align="flex-end" spacing={0.5}>
                  <HStack spacing={1} color={sideTextColor} fontSize="xs">
                    <Icon as={FaCalendarAlt} boxSize="9px" />
                    <Text lineHeight={1.3} textAlign="right">{exp.period}</Text>
                  </HStack>
                  <Text fontSize="xs" color={sideTextColor}>
                    {exp.duration}
                  </Text>
                </VStack>
              </Box>

              {/* CENTER: Dot + vertical line */}
              <Flex
                direction="column"
                align="center"
                flexShrink={0}
                w={6}
                minW={6}
              >
                {/* line above dot */}
                <Box
                  w="2px"
                  flex={index === 0 ? '0 0 22px' : '0 0 14px'}
                  bg={index === 0 ? 'transparent' : lineColor}
                />
                {/* dot */}
                <Box
                  w="10px"
                  h="10px"
                  borderRadius="full"
                  bg={dotBg}
                  border="2px solid"
                  borderColor={dotBorder}
                  flexShrink={0}
                  zIndex={1}
                />
                {/* line below dot */}
                {index < experiences.length - 1 && (
                  <Box w="2px" flex={1} bg={lineColor} mt={1} mb={0} />
                )}
              </Flex>

              {/* RIGHT: Card */}
              <Box flex={1} pl={5} pb={8}>
                {/* Mobile: logo + period inline */}
                <HStack spacing={3} mb={3} display={{ base: 'flex', md: 'none' }}>
                  <CompanyLogo org={exp.organization} logo={exp.logo} />
                  <VStack align="flex-start" spacing={0}>
                    <HStack spacing={1} color={sideTextColor} fontSize="xs">
                      <Icon as={FaCalendarAlt} boxSize="9px" />
                      <Text>{exp.period} · {exp.duration}</Text>
                    </HStack>
                  </VStack>
                </HStack>

                <Box
                  p={5}
                  bg={cardBg}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={borderColor}
                  boxShadow="sm"
                  transition={cardHover.transition}
                  _hover={cardHover.hover}
                >
                  {/* Role + employment type icon */}
                  <HStack spacing={2} mb={0.5} align="center">
                    <Heading as="h3" size="md" fontWeight="semibold" lineHeight={1.3}>
                      {exp.role}
                    </Heading>
                  </HStack>

                  {/* Org link + type badge */}
                  <HStack spacing={2} mb={1} flexWrap="wrap">
                    <ChakraLink
                      href={exp.orgUrl}
                      isExternal
                      fontSize="sm"
                      fontWeight="medium"
                      color={orgColor}
                      _hover={{ textDecoration: 'underline' }}
                    >
                      {exp.organization}
                    </ChakraLink>
                    <Text fontSize="sm" color={metaColor}>
                      · {exp.employmentType}
                    </Text>
                  </HStack>

                  {/* Location */}
                  <HStack spacing={1} color={metaColor} fontSize="xs" mb={exp.description.length > 0 ? 3 : 0}>
                    <Icon as={FaMapMarkerAlt} boxSize="9px" />
                    <Text>{exp.location}</Text>
                  </HStack>

                  {/* Description bullets */}
                  {exp.description.length > 0 && (
                    <VStack align="stretch" spacing={1.5} mb={exp.tags.length > 0 ? 4 : 0}>
                      {exp.description.map((desc, dIdx) => (
                        <HStack key={dIdx} align="flex-start" spacing={2}>
                          <Box
                            w="5px"
                            h="5px"
                            borderRadius="full"
                            bg={bulletBg}
                            mt="8px"
                            flexShrink={0}
                          />
                          <Text fontSize="sm" lineHeight="relaxed" color={useColorModeValue('gray.700', 'gray.300')}>
                            {desc}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  )}

                  {/* Tags */}
                  {exp.tags.length > 0 && (
                    <Wrap spacing={1.5} mt={exp.description.length > 0 ? 0 : 2}>
                      {exp.tags.map((tag) => (
                        <Tag
                          key={tag}
                          size="sm"
                          variant="subtle"
                          colorScheme="gray"
                          borderRadius="md"
                          px={2}
                          py={0.5}
                          fontWeight="normal"
                          fontSize="xs"
                        >
                          {tag}
                        </Tag>
                      ))}
                    </Wrap>
                  )}
                </Box>
              </Box>
            </Flex>
          </MotionBox>
        ))}
      </VStack>
    </Box>
  );
};
