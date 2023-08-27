import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Asteroid, { Props } from '@/components/Asteroid';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
    prefetch: () => {},
  }),
}));

describe('Asteroid', () => {
  let props: Props;

  beforeEach(() => {
    props = {
      data: {
        id: '123456',
        timestamp: 1692946260000,
        name: 'asteroid name',
        diameter: 250,
        distanceKilometers: 26859956,
        distanceLunar: 70,
        isHazardous: false,
      },
      distanceUnit: 'kilometers',
      isOrdered: false,
    };
  });

  test('рендерится правильно', () => {
    render(<Asteroid {...props} />);

    const headingElement = screen.getByRole('heading', { name: '25\xa0авг\xa02023', level: 2 });
    expect(headingElement).toBeInTheDocument();

    const distanceNode = screen.getByText('26 859 956 км');
    expect(distanceNode).toBeInTheDocument();

    const nameNode = screen.getByText('asteroid name');
    expect(nameNode).toBeInTheDocument();

    const diameterNode = screen.getByText(/.*250 м/);
    expect(diameterNode).toBeInTheDocument();

    const buttonElement = screen.getByRole('button', { name: 'ЗАКАЗАТЬ' });
    expect(buttonElement).toBeInTheDocument();

    const isHazardousNode = screen.queryByText(/.*Опасен/);
    expect(isHazardousNode).toBeNull;
  });

  test('рендерится правильно если дистанция в лунных орбитах', () => {
    props.distanceUnit = 'lunar';
    render(<Asteroid {...props} />);

    const distanceNode = screen.getByText('70 лунных орбит');
    expect(distanceNode).toBeInTheDocument();
  });

  test('рендерится правильно если опасен', () => {
    props.data.isHazardous = true;
    render(<Asteroid {...props} />);

    const isHazardousNode = screen.getByText(/.*Опасен/);
    expect(isHazardousNode).toBeInTheDocument;
  });

  test('рендерится правильно если заказан', () => {
    props.isOrdered = true;
    render(<Asteroid {...props} />);

    const buttonElement = screen.getByRole('button', { name: 'В КОРЗИНЕ' });
    expect(buttonElement).toBeInTheDocument();
  });

  test('рендерится правильно на странице корзины', () => {
    props.isOrderButtonHidden = true;
    render(<Asteroid {...props} />);

    const buttonElement = screen.queryByRole('button');
    expect(buttonElement).toBeNull();
  });

  test('правильный переход на страницу астероида', async () => {
    const { container } = render(<Asteroid {...props} />);
    const divContainerElement = container.firstChild as HTMLDivElement;

    await userEvent.click(divContainerElement);
    expect(pushMock).toHaveBeenCalledWith('/asteroid/123456');
  });
});
