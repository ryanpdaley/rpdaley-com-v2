import { PropTypes } from 'prop-types';
import Page from '../../components/Page';

const Idea = ({ query }) => <Page>{query.id}</Page>;

Idea.propTypes = {
  query: PropTypes.object,
};

export default Idea;
