import React, { useState } from 'react';
import {
  Container,
  Heading,
  Text,
  SimpleGrid,
  HStack,
  Button,
  Box,
  VStack,
} from '@chakra-ui/react';
import { ProjectCard } from '../components/ProjectCard';
import { PROJECTS_DATA } from '../data/projects';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export const ProjectsPage: React.FC = () => {
  const [activeTag, setActiveTag] = useState<string>('All');

  const allTags = ['All', ...Array.from(new Set(PROJECTS_DATA.flatMap((p) => p.tags)))];

  const filteredProjects =
    activeTag === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.tags.includes(activeTag));

  return (
    <Container maxW="6xl" py={10}>
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

        {/* Tag Filter Bar */}
        <HStack spacing={2} mb={8} overflowX="auto" py={2} w="full">
          {allTags.map((tag) => (
            <Button
              key={tag}
              size="sm"
              borderRadius="full"
              variant={activeTag === tag ? 'solid' : 'outline'}
              colorScheme={activeTag === tag ? 'brand' : 'gray'}
              onClick={() => setActiveTag(tag)}
            >
              {tag === 'All' ? 'All' : `#${tag}`}
            </Button>
          ))}
        </HStack>

        {/* Projects Grid */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </SimpleGrid>
      </MotionBox>
    </Container>
  );
};
