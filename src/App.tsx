import React from 'react'
import AppNavigator from './presentation/navigation/AppNavigator'
import { QueryProvider } from './presentation/providers/QueryProvider'
import { I18nextProvider } from 'react-i18next';
import i18n from './infrastructure/i18n/i18n';

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryProvider>
        <AppNavigator />
      </QueryProvider>
    </I18nextProvider>
  )
}

export default App