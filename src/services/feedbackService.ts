import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../firebase/config'

export interface FeedbackData {
  name: string
  email?: string
  phone?: string
  rating: string
  feedback: string
  favoriteProduct?: string
}

export interface StoredFeedbackData extends FeedbackData {
  id?: string
  submittedAt: Timestamp
  ipAddress?: string
  userAgent?: string
}

export const submitFeedback = async (feedbackData: FeedbackData): Promise<string> => {
  try {
    // Prepare the data to store
    const dataToStore: Omit<StoredFeedbackData, 'id'> = {
      ...feedbackData,
      submittedAt: Timestamp.now(),
      userAgent: navigator.userAgent,
      // Note: Getting IP address requires a separate service call, 
      // we'll add a placeholder for now
      ipAddress: 'client-side' // This would need a backend service to get real IP
    }

    // Add document to the 'choco_checkin' collection
    const docRef = await addDoc(collection(db, 'choco_checkin'), dataToStore)
    
    console.log('Feedback submitted successfully with ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('Error submitting feedback:', error)
    throw new Error('Failed to submit feedback. Please try again.')
  }
}

// Helper function to validate feedback data
export const validateFeedbackData = (data: FeedbackData): string[] => {
  const errors: string[] = []
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long')
  }
  
  if (data.email && !isValidEmail(data.email)) {
    errors.push('Please enter a valid email address')
  }
  
  if (!data.rating) {
    errors.push('Please select a rating')
  }
  
  if (!data.feedback || data.feedback.trim().length < 10) {
    errors.push('Feedback must be at least 10 characters long')
  }
  
  return errors
}

// Simple email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
} 