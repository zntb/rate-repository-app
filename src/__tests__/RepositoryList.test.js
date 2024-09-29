import React from 'react';
import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from '../components/RepositoryListContainer';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { queryAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />,
      );

      const languages = queryAllByTestId('language');
      const descriptions = queryAllByTestId('description');
      const stars = queryAllByTestId('stars');
      const forks = queryAllByTestId('forks');
      const reviews = queryAllByTestId('reviews');
      const rating = queryAllByTestId('rating');

      expect(languages[0]).toHaveTextContent('TypeScript');
      expect(languages[1]).toHaveTextContent('JavaScript');

      expect(descriptions[0]).toHaveTextContent(
        repositories.edges[0].node.description,
      );
      expect(descriptions[1]).toHaveTextContent(
        repositories.edges[1].node.description,
      );

      expect(stars[0]).toHaveTextContent('21,9k');
      expect(stars[1]).toHaveTextContent('1,8k');

      expect(forks[0]).toHaveTextContent('1,6k');
      expect(forks[1]).toHaveTextContent('69');

      expect(reviews[0]).toHaveTextContent('3');
      expect(reviews[1]).toHaveTextContent('3');

      expect(rating[0]).toHaveTextContent('88');
      expect(rating[1]).toHaveTextContent('72');
    });
  });
});
