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
  SimpleGrid,
  Wrap,
  Image,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { PROFILE_DATA, Experience, Education } from '../data/profile';

const MotionBox = motion(Box);

const ORG_COLORS: Record<string, { bg: string; text: string; abbr: string }> = {
  ByteDance: { bg: '#000000', text: '#ffffff', abbr: 'BD' },
  'ByteDance Seed': { bg: '#000000', text: '#ffffff', abbr: 'BD' },
  'University of Illinois Urbana-Champaign': { bg: '#E84A27', text: '#ffffff', abbr: 'UIUC' },
  NVIDIA: { bg: '#76B900', text: '#ffffff', abbr: 'NV' },
  Tencent: { bg: '#1DA462', text: '#ffffff', abbr: 'TC' },
};

const OrgLogo: React.FC<{ org: string; logo?: string; size?: string; live?: boolean }> = ({
  org,
  logo,
  size = '56px',
  live = false,
}) => {
  const fallbackBg = useColorModeValue('gray.100', 'gray.700');
  const fallbackColor = useColorModeValue('gray.600', 'gray.300');
  const badgeBorder = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const inner = logo ? (
    <Box
      boxSize={size}
      borderRadius="full"
      bg="white"
      border="1px solid"
      borderColor={borderColor}
      boxShadow="md"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Image src={logo} alt={org} boxSize="65%" objectFit="contain" />
    </Box>
  ) : (
    <Box
      boxSize={size}
      borderRadius="full"
      bg={ORG_COLORS[org]?.bg ?? fallbackBg}
      border="1px solid"
      borderColor={borderColor}
      boxShadow="md"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text
        fontSize="10px"
        fontWeight="bold"
        color={ORG_COLORS[org]?.text ?? fallbackColor}
        letterSpacing="tight"
        textAlign="center"
      >
        {ORG_COLORS[org]?.abbr ?? org.slice(0, 2).toUpperCase()}
      </Text>
    </Box>
  );

  return (
    <Box position="relative">
      {inner}
      {live && (
        <MotionBox
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          position="absolute"
          bottom="0"
          right="0"
          boxSize="14px"
          borderRadius="full"
          bg="green.400"
          border="2px solid"
          borderColor={badgeBorder}
        />
      )}
    </Box>
  );
};

type Variant = 'work' | 'education';

interface TimelineItem {
  id: string;
  title: string;
  org: string;
  orgUrl?: string;
  logo?: string;
  period: string;
  duration: string;
  location: string;
  description: string[];
  tags: string[];
  endDate: Date;
  months: number;
  isPresent: boolean;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const parseMonthYear = (s: string) => {
  const [mon, year] = s.trim().split(' ');
  return { y: parseInt(year, 10), m: MONTHS.indexOf(mon) };
};

const parsePeriod = (period: string) => {
  const [startStr, endStr] = period.split('–').map((s) => s.trim());
  const start = parseMonthYear(startStr);
  const isPresent = endStr.toLowerCase() === 'present';
  const now = new Date();
  const end = isPresent ? { y: now.getFullYear(), m: now.getMonth() } : parseMonthYear(endStr);
  const months = (end.y - start.y) * 12 + (end.m - start.m) + 1;
  const endDate = isPresent ? now : new Date(end.y, end.m, 1);
  return { endDate, months, isPresent };
};

const formatMonths = (months: number) => {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts: string[] = [];
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`);
  if (m) parts.push(`${m} mo${m > 1 ? 's' : ''}`);
  return parts.join(' ') || '0 mo';
};

const toItems = (
  entries: (Experience | Education)[],
  idPrefix: string,
  titleKey: 'role' | 'degree',
  orgKey: 'organization' | 'institution'
): TimelineItem[] =>
  entries.map((entry: any, i) => {
    const { endDate, months, isPresent } = parsePeriod(entry.period);
    return {
      id: `${idPrefix}-${i}`,
      title: entry[titleKey],
      org: entry[orgKey],
      orgUrl: entry.orgUrl,
      logo: entry.logo,
      period: entry.period,
      duration: entry.duration,
      location: entry.location,
      description: entry.description,
      tags: entry.tags,
      endDate,
      months,
      isPresent,
    };
  });

const GUTTER = 34;

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
  maxMonths: number;
  accent: string;
  shadowColor: string;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ item, index, maxMonths, accent, shadowColor }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const metaColor = useColorModeValue('gray.500', 'gray.400');
  const orgColor = useColorModeValue('blue.600', 'blue.300');
  const textSecondary = useColorModeValue('gray.700', 'gray.300');
  const barTrack = useColorModeValue('gray.100', 'gray.700');
  const hoverShadow = `0 14px 28px -14px ${shadowColor}`;

  const barPct = Math.max((item.months / maxMonths) * 100, 8);

  return (
    <MotionBox
      role="group"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      position="relative"
      mb={8}
    >
      {/* Org icon: centered on the track line, half outside the card, half overlapping it */}
      <Box
        position="absolute"
        left={`${GUTTER}px`}
        top="18px"
        transform="translateX(-50%)"
        transition="transform 0.25s ease"
        _groupHover={{ transform: 'translateX(-50%) scale(1.08)' }}
        zIndex={2}
      >
        <OrgLogo org={item.org} logo={item.logo} size="56px" live={item.isPresent} />
      </Box>

      <Box
        bg={cardBg}
        borderRadius="lg"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="md"
        ml={`${GUTTER}px`}
        p={5}
        pl={9}
        transition="transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease"
        _groupHover={{
          transform: 'translateY(-3px)',
          boxShadow: hoverShadow,
          borderColor: accent,
        }}
      >
        <Heading as="h3" size="md" fontWeight="bold" lineHeight={1.3} mb={0.5}>
          {item.title}
        </Heading>

        <ChakraLink
          href={item.orgUrl}
          isExternal
          fontSize="sm"
          fontWeight="medium"
          color={orgColor}
          _hover={{ textDecoration: 'underline' }}
        >
          {item.org}
        </ChakraLink>

        <HStack spacing={1.5} mt={1} color={metaColor} fontSize="xs">
          <Icon as={FaMapMarkerAlt} boxSize="10px" />
          <Text>{item.location}</Text>
        </HStack>

        <HStack spacing={4} mt={3} flexWrap="wrap" rowGap={1.5}>
          <HStack spacing={1.5} color={metaColor} fontSize="xs">
            <Icon as={FaCalendarAlt} boxSize="10px" />
            <Text fontWeight="medium">{item.period}</Text>
          </HStack>

          <HStack spacing={2}>
            <Box w="56px" h="6px" borderRadius="full" bg={barTrack} overflow="hidden">
              <Box h="100%" borderRadius="full" bg={accent} w={`${barPct}%`} />
            </Box>
            <Text fontSize="xs" color={metaColor} whiteSpace="nowrap">
              {item.duration}
            </Text>
          </HStack>
        </HStack>

        {item.description.length > 0 && (
          <VStack align="stretch" spacing={1.5} mt={3} mb={item.tags.length > 0 ? 3 : 0}>
            {item.description.map((desc, dIdx) => (
              <Text key={dIdx} fontSize="sm" lineHeight="relaxed" color={textSecondary}>
                {desc}
              </Text>
            ))}
          </VStack>
        )}

        {item.tags.length > 0 && (
          <Wrap spacing={1.5} mt={2}>
            {item.tags.map((tag) => (
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
    </MotionBox>
  );
};

interface TimelineColumnProps {
  variant: Variant;
  items: TimelineItem[];
  maxMonths: number;
}

const TimelineColumn: React.FC<TimelineColumnProps> = ({ variant, items, maxMonths }) => {
  const headingColor = useColorModeValue('gray.800', 'gray.100');
  const captionColor = useColorModeValue('gray.500', 'gray.400');
  const accent = useColorModeValue(
    variant === 'work' ? 'blue.500' : 'purple.500',
    variant === 'work' ? 'blue.400' : 'purple.300'
  );
  const railGradient = useColorModeValue(
    variant === 'work'
      ? 'linear(to-b, transparent, blue.200 6%, blue.300 94%, transparent)'
      : 'linear(to-b, transparent, purple.200 6%, purple.300 94%, transparent)',
    variant === 'work'
      ? 'linear(to-b, transparent, blue.700 6%, blue.600 94%, transparent)'
      : 'linear(to-b, transparent, purple.700 6%, purple.600 94%, transparent)'
  );
  const shadowColor = useColorModeValue(
    variant === 'work' ? 'rgba(49, 130, 206, 0.32)' : 'rgba(128, 90, 213, 0.32)',
    variant === 'work' ? 'rgba(99, 179, 237, 0.28)' : 'rgba(183, 148, 244, 0.28)'
  );

  const totalMonths = items.reduce((sum, it) => sum + it.months, 0);

  return (
    <Box>
      <HStack spacing={2} mb={1}>
        <Icon as={variant === 'work' ? FaBriefcase : FaGraduationCap} color={accent} boxSize="18px" />
        <Heading as="h3" size="md" fontWeight="bold" color={headingColor}>
          {variant === 'work' ? 'Work Experience' : 'Education'}
        </Heading>
      </HStack>
      <Text fontSize="xs" color={captionColor} mb={7} ml="26px">
        {items.length} {items.length === 1 ? 'entry' : 'entries'} · {formatMonths(totalMonths)} total
      </Text>

      <Box position="relative">
        <Box
          position="absolute"
          left={`${GUTTER}px`}
          top={0}
          bottom={0}
          w="3px"
          bgGradient={railGradient}
          borderRadius="full"
          transform="translateX(-50%)"
        />
        <VStack align="stretch" spacing={0}>
          {items.map((item, index) => (
            <TimelineCard
              key={item.id}
              item={item}
              index={index}
              maxMonths={maxMonths}
              accent={accent}
              shadowColor={shadowColor}
            />
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export const TimelineSection: React.FC = () => {
  const workItems = toItems(PROFILE_DATA.experiences, 'work', 'role', 'organization').sort(
    (a, b) => b.endDate.getTime() - a.endDate.getTime()
  );
  const eduItems = toItems(PROFILE_DATA.education, 'edu', 'degree', 'institution').sort(
    (a, b) => b.endDate.getTime() - a.endDate.getTime()
  );

  const maxMonths = Math.max(1, ...[...workItems, ...eduItems].map((it) => it.months));

  return (
    <Box py={8}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={16} spacingY={14}>
        <TimelineColumn variant="work" items={workItems} maxMonths={maxMonths} />
        <TimelineColumn variant="education" items={eduItems} maxMonths={maxMonths} />
      </SimpleGrid>
    </Box>
  );
};
