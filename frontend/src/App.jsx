import styled from 'styled-components';
import { Home } from './pages/Home/Home';

const AppWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;

  h1 {
    margin: 0;
    font-size: 1.8rem;
    color: #1a202c;
  }
`;

function App() {
  return (
    <AppWrapper>
      <Header>
        <h1>Gestor de tareas</h1>
      </Header>

      <main>
        <Home />
      </main>
    </AppWrapper>
  );
}

export default App;
