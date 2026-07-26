import React, { useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Tag,
  HStack,
  Text,
  useColorModeValue,
  Button,
  Flex,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE_DATA } from '../data/profile';

const MotionBox = motion(Box);

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const categories = ['All', ...PROFILE_DATA.skillCategories.map((c) => c.category)];

  const displayedCategories =
    selectedCategory === 'All'
      ? PROFILE_DATA.skillCategories
      : PROFILE_DATA.skillCategories.filter((c) => c.category === selectedCategory);

  return (
    <Box py={8}>
      <Heading as="h2" size="lg" mb={6} letterSpacing="tight" fontWeight="bold">
        Technical Skills
      </Heading>

      {/* Category Filter Buttons */}
      <HStack spacing={2} mb={6} overflowX="auto" py={1}>
        {categories.map((cat) => (
          <Button
            key={cat}
            size="xs"
            borderRadius="md"
            variant={selectedCategory === cat ? 'solid' : 'outline'}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </HStack>

      {/* Skills Grid */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <AnimatePresence mode="wait">
          {displayedCategories.map((catGroup) => (
            <MotionBox
              key={catGroup.category}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              p={6}
              bg={cardBg}
              borderRadius="xl"
              border="1px solid"
              borderColor={borderColor}
              boxShadow="sm"
            >
              <Text fontWeight="semibold" fontSize="sm" mb={4} color={useColorModeValue('gray.900', 'gray.100')}>
                {catGroup.category}
              </Text>
              <Flex wrap="wrap" gap={2}>
                {catGroup.skills.map((skill) => (
                  <Tag
                    key={skill.name}
                    size="sm"
                    borderRadius="md"
                    variant="subtle"
                    colorScheme="gray"
                    py={1}
                    px={2.5}
                    fontWeight="normal"
                  >
                    {skill.name}
                  </Tag>
                ))}
              </Flex>
            </MotionBox>
          ))}
        </AnimatePresence>
      </SimpleGrid>
    </Box>
  );
};
