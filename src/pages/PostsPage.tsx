import React, { useState } from 'react';
import {
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Box,
  Tag,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { POSTS_DATA, Post } from '../data/posts';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

const MotionBox = motion(Box);

export const PostsPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardBg = useColorModeValue('white', 'rgba(23, 30, 48, 0.7)');
  const borderColor = useColorModeValue('gray.200', 'rgba(255, 255, 255, 0.08)');

  const handleOpenPost = (post: Post) => {
    setSelectedPost(post);
    onOpen();
  };

  return (
    <Container maxW="6xl" py={10}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <VStack align="flex-start" spacing={4} mb={10}>
          <Heading as="h1" size="2xl" letterSpacing="tight">
            Posts & Articles
          </Heading>
          <Text fontSize="lg" color="gray.500">
            Technical writing on market mechanics, systems software engineering, and interview preparation.
          </Text>
        </VStack>

        <VStack spacing={6} align="stretch">
          {POSTS_DATA.map((post) => (
            <MotionBox
              key={post.id}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <Box
                p={6}
                bg={cardBg}
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderColor}
                backdropFilter="blur(16px)"
                cursor="pointer"
                onClick={() => handleOpenPost(post)}
                _hover={{ borderColor: 'brand.400' }}
              >
                <HStack justify="space-between" mb={2} wrap="wrap" gap={2}>
                  <Heading as="h2" size="md" fontWeight="bold">
                    {post.title}
                  </Heading>
                  <Text fontSize="xs" color="gray.500" fontWeight="semibold">
                    {post.date}
                  </Text>
                </HStack>

                <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')} mb={4} noOfLines={2}>
                  {post.summary}
                </Text>

                <HStack justify="space-between" align="center">
                  <HStack spacing={2}>
                    <Tag size="sm" colorScheme="purple">
                      {post.category}
                    </Tag>
                    {post.tags.map((t) => (
                      <Tag key={t} size="sm" variant="subtle" colorScheme="brand">
                        #{t}
                      </Tag>
                    ))}
                  </HStack>

                  <Button size="sm" variant="ghost" colorScheme="brand">
                    Read Article →
                  </Button>
                </HStack>
              </Box>
            </MotionBox>
          ))}
        </VStack>
      </MotionBox>

      {/* Article Reader Modal */}
      {selectedPost && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
          <ModalOverlay backdropFilter="blur(8px)" />
          <ModalContent bg={useColorModeValue('white', '#0f172a')} borderRadius="2xl">
            <ModalHeader borderBottomWidth="1px" borderColor={borderColor}>
              <Box>
                <Heading as="h3" size="md" mb={2}>
                  {selectedPost.title}
                </Heading>
                <HStack spacing={2}>
                  <Tag size="sm" colorScheme="brand">
                    {selectedPost.date}
                  </Tag>
                  <Tag size="sm" colorScheme="purple">
                    {selectedPost.category}
                  </Tag>
                </HStack>
              </Box>
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody py={6}>
              <MarkdownRenderer content={selectedPost.content} />
            </ModalBody>

            <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
              <Button onClick={onClose} size="sm" colorScheme="brand">
                Close Article
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};
