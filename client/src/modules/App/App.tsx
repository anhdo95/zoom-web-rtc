import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Peer from 'peerjs';

import './App.css';

function lazy(module: Promise<any>) {
  return React.lazy(() => module)
}

const Home = lazy(import('modules/Home/Home'))
const Room = lazy(import('modules/Room/Room'))

function App() {
  return (
    <BrowserRouter>
					<Suspense fallback={<div>Loading...</div>}>
						<Switch>
							<Route path="/room/:id" component={Room} />
							<Route path="/" component={Home} />
						</Switch>
					</Suspense>
			</BrowserRouter>
  );
}

export default App;
