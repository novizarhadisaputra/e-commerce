import React from 'react'
import './assets/styles/global.css'
import AppNavigator from './presentation/navigation/AppNavigator'
import { QueryProvider } from './presentation/providers/QueryProvider'

const App: React.FC = () => {
  return (<QueryProvider>
    <AppNavigator />
  </QueryProvider>)
}

export default App