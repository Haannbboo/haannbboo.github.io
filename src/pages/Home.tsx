import React, { useEffect, useRef } from 'react';
import { Box, Container, Heading, Image, SimpleGrid, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { GitHubCalendar } from 'react-github-calendar';
import type { Activity } from 'react-github-calendar';
import { HeroSection } from '../components/HeroSection';
import { TimelineSection } from '../components/TimelineSection';

const GITHUB_USER = 'Haannbboo';

export const Home: React.FC = () => {
  const calBg = useColorModeValue('white', 'gray.800');
  const calBorder = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.200');
  const calScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = calScrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  return (
    <Container maxW="6xl" py={4}>
      <HeroSection />

      <TimelineSection />

      {/* GitHub Stats */}
      <Box pt={2} pb={8}>
        <Heading as="h2" size="lg" mb={6} letterSpacing="tight" fontWeight="bold" textAlign="center">
          GitHub Activity
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Image
              src="https://raw.githubusercontent.com/Haannbboo/github-stats/generated/overview.svg"
              alt="GitHub overview"
              w="full"
              borderRadius="xl"
            />
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Image
              src="https://raw.githubusercontent.com/Haannbboo/github-stats/generated/languages.svg"
              alt="GitHub languages"
              w="full"
              borderRadius="xl"
            />
          </Box>

          <Box
            ref={calScrollRef}
            p={5}
            bg={calBg}
            borderRadius="xl"
            border="1px solid"
            borderColor={calBorder}
            boxShadow="sm"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={textColor}
            overflowX="auto"
          >
            <GitHubCalendar
              username={GITHUB_USER}
              colorScheme="light"
              fontSize={10}
              blockSize={9}
              renderBlock={(block, activity: Activity) => (
                <Tooltip
                  key={activity.date}
                  label={`${activity.count} contribution${activity.count === 1 ? '' : 's'} on ${activity.date}`}
                  hasArrow
                  openDelay={100}
                >
                  {block}
                </Tooltip>
              )}
            />
          </Box>
        </SimpleGrid>
      </Box>
    </Container>
  );
};
