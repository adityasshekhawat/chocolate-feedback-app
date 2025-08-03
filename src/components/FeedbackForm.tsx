import { useState } from 'react'
import { Box, Container, Heading, Text, Button, Icon } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiHeart, FiStar, FiZap, FiAlertCircle } from 'react-icons/fi'
import { submitFeedback, validateFeedbackData, type FeedbackData } from '../services/feedbackService'

const MotionBox = motion(Box)

// Floating chocolate component
const FloatingChocolate = ({ emoji, delay = 0, duration = 8, size = "3xl" }: { emoji: string, delay?: number, duration?: number, size?: string }) => (
  <motion.div
    style={{
      position: 'absolute',
      fontSize: size === "3xl" ? '3rem' : size === "2xl" ? '2rem' : '1.5rem',
      userSelect: 'none',
      pointerEvents: 'none',
      zIndex: 0,
    }}
    initial={{ 
      opacity: 0,
      scale: 0,
      rotateY: 0,
      rotateX: 0,
    }}
    animate={{ 
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1.1, 0.9, 1],
      y: ['100vh', '-100px'],
      x: [0, 50, -30, 20, 0],
      rotateY: [0, 180, 360],
      rotateX: [0, 45, -45, 0],
      rotateZ: [0, 15, -15, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.1, 0.8, 0.9, 1],
    }}
  >
    {emoji}
  </motion.div>
)

const FeedbackForm = () => {
  const [formData, setFormData] = useState<FeedbackData>({
    name: '',
    email: '',
    phone: '',
    rating: '',
    feedback: '',
    favoriteProduct: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setValidationErrors([])
    
    // Validate form data
    const errors = validateFeedbackData(formData)
    if (errors.length > 0) {
      setValidationErrors(errors)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Submit to Firebase
      const docId = await submitFeedback(formData)
      console.log('Feedback submitted with ID:', docId)
      
      // Show success state
      setShowSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        rating: '',
        feedback: '',
        favoriteProduct: ''
      })
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting feedback:', error)
      setError(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
    
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([])
    }
    if (error) {
      setError(null)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    fontSize: '16px',
    border: '2px solid transparent',
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdrop: 'blur(10px)',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: 'Inter, sans-serif',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  }

  const inputFocusStyle = {
    ...inputStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#FF6B9D',
    boxShadow: '0 8px 30px rgba(255, 107, 157, 0.3), 0 0 0 4px rgba(255, 107, 157, 0.1)',
    transform: 'translateY(-2px)'
  }

  const errorInputStyle = {
    ...inputStyle,
    borderColor: '#FF6B6B',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  }

  if (showSuccess) {
    return (
      <Container maxW="container.sm" py={10}>
        <MotionBox
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          <Box 
            textAlign="center" 
            background="linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)"
            backdropFilter="blur(20px)"
            p={16} 
            borderRadius="32px" 
            boxShadow="0 25px 50px rgba(0, 0, 0, 0.15)"
            border="1px solid rgba(255, 255, 255, 0.3)"
            position="relative"
            overflow="hidden"
          >
            {/* Success page floating chocolates */}
            <Box position="absolute" top="10%" left="10%">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotateZ: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ fontSize: '2rem' }}
              >
                🍫
              </motion.div>
            </Box>
            <Box position="absolute" top="20%" right="15%">
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotateY: [0, 180, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                style={{ fontSize: '1.5rem' }}
              >
                🍩
              </motion.div>
            </Box>
            <Box position="absolute" bottom="20%" left="20%">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotateX: [0, 180, 360],
                  scale: [1, 1.3, 1]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                style={{ fontSize: '1.8rem' }}
              >
                🧁
              </motion.div>
            </Box>

            <Box 
              position="absolute"
              top="-50%"
              left="-50%"
              width="200%"
              height="200%"
              background="linear-gradient(45deg, rgba(255, 107, 157, 0.1), rgba(139, 69, 19, 0.1), rgba(255, 182, 193, 0.1))"
              animation="float 6s ease-in-out infinite"
              zIndex={0}
            />
            <Box position="relative" zIndex={1}>
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Icon as={FiZap} w={20} h={20} color="#FF6B9D" mb={6} />
              </motion.div>
              <Heading 
                size="xl" 
                background="linear-gradient(135deg, #FF6B9D, #8B4513)"
                backgroundClip="text"
                color="transparent"
                mb={4}
                fontWeight="800"
              >
                You're amazing! ✨
              </Heading>
              <Text color="#666" fontSize="xl" fontWeight="500" mb={4}>
                Thanks for the vibes! Your feedback means everything 💫
              </Text>
              <Text color="#888" fontSize="sm" fontWeight="400">
                Your feedback has been safely stored and we'll use it to make even better chocolates!
              </Text>
            </Box>
          </Box>
        </MotionBox>
      </Container>
    )
  }

  return (
    <Box 
      minH="100vh" 
      background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      position="relative"
      overflow="hidden"
    >
      {/* Floating chocolate emojis */}
      <Box position="absolute" left="5%" style={{ top: '10%' }}>
        <FloatingChocolate emoji="🍫" delay={0} duration={12} size="3xl" />
      </Box>
      <Box position="absolute" right="10%" style={{ top: '20%' }}>
        <FloatingChocolate emoji="🍩" delay={2} duration={10} size="2xl" />
      </Box>
      <Box position="absolute" left="15%" style={{ top: '60%' }}>
        <FloatingChocolate emoji="🧁" delay={4} duration={14} size="2xl" />
      </Box>
      <Box position="absolute" right="5%" style={{ top: '70%' }}>
        <FloatingChocolate emoji="🍪" delay={1} duration={11} size="xl" />
      </Box>
      <Box position="absolute" left="50%" style={{ top: '30%' }}>
        <FloatingChocolate emoji="🍰" delay={3} duration={13} size="xl" />
      </Box>
      <Box position="absolute" right="25%" style={{ top: '50%' }}>
        <FloatingChocolate emoji="🍭" delay={5} duration={9} size="xl" />
      </Box>
      <Box position="absolute" left="30%" style={{ top: '80%' }}>
        <FloatingChocolate emoji="🍬" delay={2.5} duration={15} size="2xl" />
      </Box>
      <Box position="absolute" right="40%" style={{ top: '10%' }}>
        <FloatingChocolate emoji="🍯" delay={1.5} duration={8} size="xl" />
      </Box>

      {/* Animated background elements */}
      <Box
        position="absolute"
        top="10%"
        left="10%"
        width="300px"
        height="300px"
        borderRadius="50%"
        background="rgba(255, 255, 255, 0.1)"
        filter="blur(100px)"
        animation="float 8s ease-in-out infinite"
      />
      <Box
        position="absolute"
        bottom="10%"
        right="10%"
        width="200px"
        height="200px"
        borderRadius="50%"
        background="rgba(255, 107, 157, 0.2)"
        filter="blur(80px)"
        animation="float 6s ease-in-out infinite reverse"
      />

      <Container maxW="container.sm" py={10} position="relative" zIndex={1}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <Box mb={12} textAlign="center" position="relative">
            {/* Heart animation with floating chocolates around it */}
            <Box position="relative" display="inline-block">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Icon as={FiHeart} w={16} h={16} color="white" mb={6} />
              </motion.div>
              
              {/* Mini chocolates around the heart */}
              <Box position="absolute" top="-10px" left="-20px">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotateZ: [0, 180, 360]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{ fontSize: '1rem' }}
                >
                  🍫
                </motion.div>
              </Box>
              <Box position="absolute" top="-10px" right="-20px">
                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                    rotateY: [0, 180, 360]
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                  style={{ fontSize: '0.8rem' }}
                >
                  🍩
                </motion.div>
              </Box>
            </Box>
            
            <Heading 
              size="2xl" 
              mb={4}
              color="white"
              fontWeight="900"
              textShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
            >
              How was the chocolate? 🍫
            </Heading>
            <Text color="rgba(255, 255, 255, 0.9)" fontSize="lg" fontWeight="500">
              Spill the tea - we want all the deets! ☕
            </Text>
          </Box>

          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box
              as="form"
              onSubmit={handleSubmit}
              background="rgba(255, 255, 255, 0.15)"
              backdropFilter="blur(20px)"
              p={10}
              borderRadius="32px"
              boxShadow="0 25px 50px rgba(0, 0, 0, 0.2)"
              border="1px solid rgba(255, 255, 255, 0.2)"
              position="relative"
              overflow="hidden"
            >
              {/* Form floating chocolates */}
              <Box position="absolute" top="5%" right="5%" zIndex={0}>
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotateZ: [0, 45, -45, 0],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                  style={{ fontSize: '1.5rem' }}
                >
                  🍫
                </motion.div>
              </Box>
              <Box position="absolute" bottom="10%" left="8%" zIndex={0}>
                <motion.div
                  animate={{ 
                    y: [0, -12, 0],
                    rotateY: [0, 180, 360],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                  style={{ fontSize: '1.2rem' }}
                >
                  🧁
                </motion.div>
              </Box>

              <Box position="relative" zIndex={1}>
                {/* Error Messages */}
                {(error || validationErrors.length > 0) && (
                  <Box 
                    mb={6} 
                    p={4} 
                    borderRadius="12px" 
                    background="rgba(255, 107, 107, 0.1)"
                    border="1px solid rgba(255, 107, 107, 0.3)"
                  >
                    <Box display="flex" alignItems="center" mb={2}>
                      <Icon as={FiAlertCircle} color="#FF6B6B" mr={2} />
                      <Text color="#FF6B6B" fontWeight="600" fontSize="sm">
                        Oops! Please fix the following:
                      </Text>
                    </Box>
                    {error && (
                      <Text color="#FF6B6B" fontSize="sm" mb={1}>• {error}</Text>
                    )}
                    {validationErrors.map((err, index) => (
                      <Text key={index} color="#FF6B6B" fontSize="sm" mb={1}>• {err}</Text>
                    ))}
                  </Box>
                )}

                <Box mb={8}>
                  <Text fontSize="sm" fontWeight="700" mb={3} color="white" textTransform="uppercase" letterSpacing="1px">
                    What's your name? ✨
                  </Text>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your awesome name"
                    style={validationErrors.some(err => err.includes('Name')) ? errorInputStyle : inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, validationErrors.some(err => err.includes('Name')) ? errorInputStyle : inputStyle)}
                    required
                  />
                </Box>

                <Box mb={8}>
                  <Text fontSize="sm" fontWeight="700" mb={3} color="white" textTransform="uppercase" letterSpacing="1px">
                    Email (for the good news) 📧
                  </Text>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@cool.com"
                    style={validationErrors.some(err => err.includes('email')) ? errorInputStyle : inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, validationErrors.some(err => err.includes('email')) ? errorInputStyle : inputStyle)}
                  />
                </Box>

                <Box mb={8}>
                  <Text fontSize="sm" fontWeight="700" mb={3} color="white" textTransform="uppercase" letterSpacing="1px">
                    Phone (optional but appreciated) 📱
                  </Text>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your digits"
                    style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  />
                </Box>

                <Box mb={8}>
                  <Text fontSize="sm" fontWeight="700" mb={3} color="white" textTransform="uppercase" letterSpacing="1px">
                    Rate the vibes 🔥
                  </Text>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    style={validationErrors.some(err => err.includes('rating')) ? errorInputStyle : inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, validationErrors.some(err => err.includes('rating')) ? errorInputStyle : inputStyle)}
                    required
                  >
                    <option value="">Pick your vibe</option>
                    <option value="5">🔥🔥🔥🔥🔥 ABSOLUTELY FIRE!</option>
                    <option value="4">🚀🚀🚀🚀 Pretty dope</option>
                    <option value="3">😊😊😊 It's cool</option>
                    <option value="2">😐😐 Meh, could be better</option>
                    <option value="1">😅 Needs some work</option>
                  </select>
                </Box>

                <Box mb={8}>
                  <Text fontSize="sm" fontWeight="700" mb={3} color="white" textTransform="uppercase" letterSpacing="1px">
                    Which one hit different? 🎯
                  </Text>
                  <select
                    name="favoriteProduct"
                    value={formData.favoriteProduct}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  >
                    <option value="">Choose your fave</option>
                    <option value="dark-original">🖤 Dark Chocolate (the OG)</option>
                    <option value="dark-pistachio">🖤🥜 Pistachio Dark Chocolate</option>
                    <option value="dark-nutty">🖤🥜 Dark Nutty Chocolate</option>
                    <option value="rose-white">🤍🌹 Rose White Chocolate</option>
                    <option value="pistachio-rose-milk">🤎🌹 Pistachio Rose Milk Chocolate</option>
                  </select>
                </Box>

                <Box mb={10}>
                  <Text fontSize="sm" fontWeight="700" mb={3} color="white" textTransform="uppercase" letterSpacing="1px">
                    Tell us everything! 💭
                  </Text>
                  <textarea
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    placeholder="What made you smile? What could we do better? Give us all the tea! ☕✨"
                    rows={5}
                    style={validationErrors.some(err => err.includes('Feedback')) ? errorInputStyle : inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, validationErrors.some(err => err.includes('Feedback')) ? errorInputStyle : inputStyle)}
                    required
                  />
                </Box>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    size="xl"
                    width="full"
                    disabled={isSubmitting}
                    background="linear-gradient(135deg, #FF6B9D, #FF8E53)"
                    color="white"
                    fontWeight="800"
                    fontSize="lg"
                    borderRadius="20px"
                    py={8}
                    border="none"
                    boxShadow="0 10px 30px rgba(255, 107, 157, 0.4)"
                    _hover={{ 
                      background: "linear-gradient(135deg, #FF8E53, #FF6B9D)",
                      boxShadow: "0 15px 40px rgba(255, 107, 157, 0.6)",
                      transform: "translateY(-2px)"
                    }}
                    _active={{ transform: "translateY(0)" }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        ⚡ Sending to Firebase...
                      </motion.div>
                    ) : (
                      <>
                        <FiStar style={{ marginRight: '12px' }} />
                        Send the vibes! 🚀
                      </>
                    )}
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </MotionBox>
        </MotionBox>
      </Container>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </Box>
  )
}

export default FeedbackForm 