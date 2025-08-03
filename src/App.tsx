import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import FeedbackForm from './components/FeedbackForm'

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <FeedbackForm />
    </ChakraProvider>
  )
}

export default App
