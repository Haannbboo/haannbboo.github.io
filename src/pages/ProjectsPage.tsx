import React from 'react';
import {
  Container,
  Heading,
  Text,
  SimpleGrid,
  Box,
  VStack,
} from '@chakra-ui/react';
import { ProjectCard } from '../components/ProjectCard';
import { PROJECTS_DATA } from '../data/projects';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export const ProjectsPage: React.FC = () => {
  return (
    <Container maxW="6xl" px={{ base: 4, md: 6 }} py={10}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <VStack align="flex-start" spacing={4} mb={8}>
          <Heading as="h1" size="2xl" letterSpacing="tight">
            Projects
          </Heading>
          <Text fontSize="lg" color="gray.500" maxW="2xl">
            A collection of open-source Python packages, distributed inferencers, IoT localization systems, and market trading utilities.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {PROJECTS_DATA.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </SimpleGrid>
      </MotionBox>
    </Container>
  );
};
