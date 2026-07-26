import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { HeroSection } from '../components/HeroSection';
import { SkillsSection } from '../components/SkillsSection';
import { TimelineSection } from '../components/TimelineSection';

export const Home: React.FC = () => {
  return (
    <Container maxW="6xl" py={4}>
      <HeroSection />

      <TimelineSection />

      <SkillsSection />
    </Container>
  );
};
