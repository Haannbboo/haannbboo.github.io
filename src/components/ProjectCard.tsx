import React from 'react';
import {
  Box,
  Heading,
  Text,
  HStack,
  VStack,
  Button,
  Image,
  useColorModeValue,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaGithub, FaFilePdf, FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Project } from '../data/projects';

const MotionBox = motion(Box);

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <MotionBox
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      h="full"
    >
      <Box
        h="full"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        p={6}
        bg={cardBg}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="sm"
        _hover={{ borderColor: useColorModeValue('gray.400', 'gray.500') }}
        cursor="pointer"
        onClick={() => navigate(`/projects/${project.id}`)}
      >
        <VStack align="stretch" spacing={4}>
          {project.image && (
            <Box borderRadius="lg" overflow="hidden" maxH="180px">
              <Image
                src={project.image}
                alt={project.title}
                w="full"
                h="full"
                objectFit="cover"
              />
            </Box>
          )}

          <Box>
            <Heading
              as="h3"
              size="md"
              fontWeight="semibold"
              mb={2}
            >
              <Link to={`/projects/${project.id}`}>{project.title}</Link>
            </Heading>

            <Text fontSize="sm" color={textColor} noOfLines={3}>
              {project.summary}
            </Text>
          </Box>
        </VStack>

        <HStack justify="space-between" mt={6} pt={4} borderTop="1px solid" borderColor={borderColor} wrap="wrap" rowGap={2}>
          <Button
            size="xs"
            variant="ghost"
            rightIcon={<FaArrowRight />}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/projects/${project.id}`);
            }}
          >
            Read Article
          </Button>

          <HStack spacing={2} wrap="wrap" onClick={(e) => e.stopPropagation()}>
            {project.github && (
              <ChakraLink href={project.github} isExternal>
                <Button size="xs" leftIcon={<FaGithub />} variant="outline">
                  Code
                </Button>
              </ChakraLink>
            )}
            {project.reportUrl && (
              <ChakraLink href={project.reportUrl} isExternal>
                <Button size="xs" leftIcon={<FaFilePdf />} variant="outline">
                  Report
                </Button>
              </ChakraLink>
            )}
          </HStack>
        </HStack>
      </Box>
    </MotionBox>
  );
};
