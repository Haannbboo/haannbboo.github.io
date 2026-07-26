import React from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Heading,
  Text,
  Tag,
  HStack,
  VStack,
  Button,
  Image,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
  Divider,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFilePdf, FaArrowLeft, FaChevronRight } from 'react-icons/fa';
import { PROJECTS_DATA } from '../data/projects';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

const MotionBox = motion(Box);

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = PROJECTS_DATA.find((p) => p.id === id);

  const cardBg = useColorModeValue('white', 'rgba(23, 30, 48, 0.7)');
  const borderColor = useColorModeValue('gray.200', 'rgba(255, 255, 255, 0.08)');

  if (!project) {
    return (
      <Container maxW="4xl" py={20} textAlign="center">
        <Heading size="xl" mb={4}>
          Project Not Found
        </Heading>
        <Text color="gray.500" mb={6}>
          The project with ID "{id}" could not be found.
        </Text>
        <Button leftIcon={<FaArrowLeft />} colorScheme="brand" onClick={() => navigate('/projects')}>
          Back to Projects
        </Button>
      </Container>
    );
  }

  return (
    <Container maxW="4xl" py={10}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Breadcrumb Navigation */}
        <Breadcrumb separator={<Icon as={FaChevronRight} color="gray.500" fontSize="xs" />} mb={6}>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/projects">
              Projects
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="brand.400" fontWeight="bold">
              {project.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Project Header */}
        <Box
          p={{ base: 6, md: 8 }}
          mb={8}
          bg={cardBg}
          borderRadius="2xl"
          border="1px solid"
          borderColor={borderColor}
          backdropFilter="blur(16px)"
          boxShadow="0 10px 30px rgba(0,0,0,0.05)"
        >
          <VStack align="flex-start" spacing={4}>
            <HStack spacing={2} wrap="wrap">
              {project.tags.map((tag) => (
                <Tag key={tag} size="md" colorScheme="brand" variant="subtle" borderRadius="full">
                  #{tag}
                </Tag>
              ))}
            </HStack>

            <Heading as="h1" size="2xl" letterSpacing="tight">
              {project.title}
            </Heading>

            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
              {project.summary}
            </Text>

            {/* Action Links */}
            <HStack spacing={4} pt={2} wrap="wrap">
              {project.github && (
                <Button
                  as="a"
                  href={project.github}
                  target="_blank"
                  leftIcon={<FaGithub />}
                  colorScheme="brand"
                  size="md"
                >
                  GitHub Repository
                </Button>
              )}
              {project.pypiUrl && (
                <Button
                  as="a"
                  href={project.pypiUrl}
                  target="_blank"
                  leftIcon={<FaExternalLinkAlt />}
                  colorScheme="teal"
                  size="md"
                >
                  PyPI Package
                </Button>
              )}
              {project.reportUrl && (
                <Button
                  as="a"
                  href={project.reportUrl}
                  target="_blank"
                  leftIcon={<FaFilePdf />}
                  colorScheme="purple"
                  variant="outline"
                  size="md"
                >
                  Read Paper / Report
                </Button>
              )}
            </HStack>
          </VStack>

          {project.image && (
            <Box mt={6} borderRadius="xl" overflow="hidden" maxH="400px">
              <Image
                src={project.image}
                alt={project.title}
                w="full"
                h="full"
                objectFit="cover"
              />
            </Box>
          )}
        </Box>

        <Divider mb={8} />

        {/* Markdown Rendered Content */}
        <Box
          p={{ base: 6, md: 8 }}
          bg={cardBg}
          borderRadius="2xl"
          border="1px solid"
          borderColor={borderColor}
          backdropFilter="blur(16px)"
        >
          <MarkdownRenderer content={project.content} />
        </Box>

        {/* Bottom Back Button */}
        <Box mt={8}>
          <Button
            leftIcon={<FaArrowLeft />}
            variant="ghost"
            colorScheme="brand"
            onClick={() => navigate('/projects')}
          >
            Back to All Projects
          </Button>
        </Box>
      </MotionBox>
    </Container>
  );
};
