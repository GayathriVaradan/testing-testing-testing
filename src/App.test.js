import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';


describe('Counter app testing', ()=> {


  const server = setupServer(
    rest.get('/getcounter', (req, res, ctx)=> {
      return res(ctx.json({counter: 33}));
    })
  );

  beforeAll(()=> { server.listen()});
  let getByTestId;
  let findByText;
  beforeEach(async ()=> {
    ({ getByTestId, findByText } = render(<App/>));
  })
  afterEach(()=> { 
    server.resetHandlers()
  });
  afterAll(()=> { server.close()});

  test('renders app title', ()=> {
    const title = getByTestId('title'); 
    expect(title.innerHTML).toBe('React counter app demo');
  });

  test('renders an increment btn', ()=> {
    const incBtn = getByTestId('inc-button');
    expect(incBtn).toHaveTextContent('+');
  });

  test('renders an decrement btn', ()=> {
    const decBtn = getByTestId('dec-button');
    expect(decBtn).toHaveTextContent('-');
  });

  test('renders a counter', ()=> {
    const counter = getByTestId('counter');
    expect(counter).toHaveTextContent('0');
  });
  
  test('Clicking the + button should increase the counter', ()=> {
    const counter = getByTestId('counter');
    const incBtn = getByTestId('inc-button');
    userEvent.click(incBtn);
    expect(counter).toHaveTextContent('1');
  });
  
  test('Clicking the - button should decrease the counter', ()=> {
    const counter = getByTestId('counter');
    const decBtn = getByTestId('dec-button');
    userEvent.click(decBtn);
    expect(counter).toHaveTextContent('-1');
  });
  
  /**
   * Async test so we wait for the api call
   */
  test('Initial counter state should be fetched by an external API', async ()=> {
    expect(await findByText('33')).toBeInTheDocument();
  });

})
