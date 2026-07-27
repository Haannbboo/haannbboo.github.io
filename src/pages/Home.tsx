import React from 'react';
import { Box, Container, Heading, Image, SimpleGrid } from '@chakra-ui/react';
import { HeroSection } from '../components/HeroSection';
import { SkillsSection } from '../components/SkillsSection';
import { TimelineSection } from '../components/TimelineSection';

export const Home: React.FC = () => {
  return (
    <Container maxW="6xl" py={4}>
      <HeroSection />

      <TimelineSection />

      <SkillsSection />

      {/* GitHub Stats */}
      <Box py={8}>
        <Heading as="h2" size="lg" mb={6} letterSpacing="tight" fontWeight="bold">
          GitHub Activity
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <Image
            src="https://raw.githubusercontent.com/Haannbboo/github-stats/generated/overview.svg"
            alt="GitHub overview"
            w="full"
            borderRadius="xl"
          />
          <Image
            src="https://raw.githubusercontent.com/Haannbboo/github-stats/generated/languages.svg"
            alt="GitHub languages"
            w="full"
            borderRadius="xl"
          />
        </SimpleGrid>
      </Box>
    </Container>
  );
};
