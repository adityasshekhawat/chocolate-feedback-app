import { useState, useEffect } from 'react'
import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import { Box, Container, Heading, Text, VStack, HStack, Badge } from '@chakra-ui/react'
import type { StoredFeedbackData } from '../services/feedbackService'

interface FeedbackEntry extends Omit<StoredFeedbackData, 'submittedAt'> {
  id: string
  submittedAt: Date
}

const AdminDashboard = () => {
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    try {
      const q = query(collection(db, 'choco_checkin'), orderBy('submittedAt', 'desc'))
      const querySnapshot = await getDocs(q)
      
      const feedbackData: FeedbackEntry[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        feedbackData.push({
          id: doc.id,
          ...data,
          submittedAt: (data.submittedAt as Timestamp).toDate()
        } as FeedbackEntry)
      })
      
      setFeedback(feedbackData)
    } catch (err) {
      console.error('Error fetching feedback:', err)
      setError('Failed to load feedback data')
    } finally {
      setLoading(false)
    }
  }

  const getRatingStars = (rating: string) => {
    const num = parseInt(rating)
    switch(num) {
      case 5: return '🔥🔥🔥🔥🔥'
      case 4: return '🚀🚀🚀🚀'
      case 3: return '😊😊😊'
      case 2: return '😐😐'
      case 1: return '😅'
      default: return '❓'
    }
  }

  const getRatingColor = (rating: string) => {
    const num = parseInt(rating)
    if (num >= 4) return 'green'
    if (num === 3) return 'yellow'
    return 'red'
  }

  if (loading) {
    return (
      <Container maxW="container.lg" py={10}>
        <Text textAlign="center" fontSize="xl">Loading feedback... 🍫</Text>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxW="container.lg" py={10}>
        <Text textAlign="center" fontSize="xl" color="red.500">{error}</Text>
      </Container>
    )
  }

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8}>
        <Box textAlign="center">
          <Heading size="xl" mb={2}>Chocolate Feedback Dashboard 🍫</Heading>
          <Text color="gray.600">Total responses: {feedback.length}</Text>
        </Box>

        {feedback.length === 0 ? (
          <Text textAlign="center" fontSize="lg" color="gray.500">
            No feedback yet. Share your QR code to get started! 📱
          </Text>
        ) : (
          <VStack spacing={6} width="100%">
            {feedback.map((entry) => (
              <Box
                key={entry.id}
                w="100%"
                p={6}
                bg="white"
                borderRadius="xl"
                boxShadow="sm"
                border="1px"
                borderColor="gray.200"
              >
                <HStack justify="space-between" mb={4}>
                  <Box>
                    <Text fontWeight="bold" fontSize="lg">{entry.name}</Text>
                    {entry.email && (
                      <Text color="gray.600" fontSize="sm">{entry.email}</Text>
                    )}
                    {entry.phone && (
                      <Text color="gray.600" fontSize="sm">{entry.phone}</Text>
                    )}
                  </Box>
                  <VStack align="end" spacing={1}>
                    <Badge colorScheme={getRatingColor(entry.rating)} variant="solid">
                      {getRatingStars(entry.rating)} ({entry.rating}/5)
                    </Badge>
                    <Text fontSize="xs" color="gray.500">
                      {entry.submittedAt.toLocaleDateString()} at {entry.submittedAt.toLocaleTimeString()}
                    </Text>
                  </VStack>
                </HStack>

                {entry.favoriteProduct && (
                  <Box mb={3}>
                    <Text fontSize="sm" color="gray.600">
                      <strong>Favorite:</strong> {entry.favoriteProduct}
                    </Text>
                  </Box>
                )}

                <Box
                  p={4}
                  bg="gray.50"
                  borderRadius="lg"
                  border="1px"
                  borderColor="gray.100"
                >
                  <Text fontSize="sm" color="gray.700">
                    "{entry.feedback}"
                  </Text>
                </Box>
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
    </Container>
  )
}

export default AdminDashboard 