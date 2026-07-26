import React from 'react';
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  OrderedList,
  ListItem,
  Code,
  Link as ChakraLink,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const headingColor = useColorModeValue('gray.900', 'white');
  const codeBg = useColorModeValue('gray.100', 'gray.800');
  const quoteBg = useColorModeValue('gray.100', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const renderFormattedText = (text: string) => {
    const parts: React.ReactNode[] = [];
    let keyIdx = 0;

    const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g;
    const tokens = text.split(regex);

    tokens.forEach((token) => {
      if (!token) return;

      if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(
          <Text as="strong" key={keyIdx++} fontWeight="bold" color={headingColor}>
            {token.slice(2, -2)}
          </Text>
        );
      } else if (token.startsWith('*') && token.endsWith('*')) {
        parts.push(
          <Text as="em" key={keyIdx++} fontStyle="italic">
            {token.slice(1, -1)}
          </Text>
        );
      } else if (token.startsWith('`') && token.endsWith('`')) {
        parts.push(
          <Code key={keyIdx++} px={2} py={0.5} borderRadius="md" colorScheme="gray" bg={codeBg} fontSize="sm">
            {token.slice(1, -1)}
          </Code>
        );
      } else if (token.startsWith('[') && token.includes('](') && token.endsWith(')')) {
        const linkMatch = token.match(/^\[(.*?)\]\((.*?)\)$/);
        if (linkMatch) {
          parts.push(
            <ChakraLink
              key={keyIdx++}
              href={linkMatch[2]}
              isExternal
              color={useColorModeValue('gray.900', 'white')}
              fontWeight="medium"
              textDecoration="underline"
              _hover={{ color: 'gray.500' }}
            >
              {linkMatch[1]} <Icon as={FaExternalLinkAlt} mx="2px" fontSize="xs" />
            </ChakraLink>
          );
        } else {
          parts.push(token);
        }
      } else {
        parts.push(token);
      }
    });

    return parts;
  };

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let listBuffer: string[] = [];
  let keyCounter = 0;

  const flushList = () => {
    if (listBuffer.length > 0) {
      elements.push(
        <UnorderedList key={`list-${keyCounter++}`} spacing={2} mb={4} pl={4} color={textColor}>
          {listBuffer.map((item, i) => (
            <ListItem key={i} fontSize="md" lineHeight="relaxed">
              {renderFormattedText(item)}
            </ListItem>
          ))}
        </UnorderedList>
      );
      listBuffer = [];
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <Box
            key={`code-${keyCounter++}`}
            as="pre"
            p={4}
            my={4}
            bg={codeBg}
            borderRadius="lg"
            overflowX="auto"
            fontFamily="mono"
            fontSize="sm"
            border="1px solid"
            borderColor={borderColor}
          >
            <Code display="block" whiteSpace="pre" bg="transparent" p={0} color={textColor}>
              {codeBuffer.join('\n')}
            </Code>
          </Box>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        flushList();
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    if (trimmed.startsWith('# ')) {
      flushList();
      elements.push(
        <Heading key={`h1-${keyCounter++}`} as="h1" size="xl" mt={8} mb={4} letterSpacing="tight" color={headingColor}>
          {trimmed.replace(/^#\s+/, '')}
        </Heading>
      );
    } else if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <Heading key={`h2-${keyCounter++}`} as="h2" size="lg" mt={6} mb={3} letterSpacing="tight" color={headingColor}>
          {trimmed.replace(/^##\s+/, '')}
        </Heading>
      );
    } else if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <Heading key={`h3-${keyCounter++}`} as="h3" size="md" mt={5} mb={2} color={headingColor}>
          {trimmed.replace(/^###\s+/, '')}
        </Heading>
      );
    } else if (trimmed.startsWith('> ')) {
      flushList();
      elements.push(
        <Box
          key={`quote-${keyCounter++}`}
          p={4}
          my={4}
          bg={quoteBg}
          borderLeft="3px solid"
          borderColor={useColorModeValue('gray.400', 'gray.500')}
          borderRadius="sm"
        >
          <Text fontSize="md" color={textColor}>
            {renderFormattedText(trimmed.replace(/^>\s+/, ''))}
          </Text>
        </Box>
      );
    } else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      listBuffer.push(trimmed.replace(/^[\*\-]\s+/, ''));
    } else if (trimmed === '') {
      flushList();
    } else {
      flushList();
      elements.push(
        <Text key={`p-${keyCounter++}`} fontSize="md" lineHeight="relaxed" mb={4} color={textColor}>
          {renderFormattedText(line)}
        </Text>
      );
    }
  });

  flushList();

  return <Box className="markdown-body">{elements}</Box>;
};
