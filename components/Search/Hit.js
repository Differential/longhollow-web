import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Highlight } from 'react-instantsearch-dom';
import getURLFromType from 'utils/getURLFromType.js';

function Hit(props) {
  const router = useRouter();
  const url = getURLFromType(props.hit);
  return (
    <div
      onClick={url ? () => router.push(url) : null}
      style={{ cursor: url ? 'pointer' : 'default' }}
    >
      <img
        src={props.hit.coverImage ? props.hit.coverImage.sources[0].uri : null}
        height="100px"
        alt={props.hit.title}
      />
      <div className="hit-name">
        <Highlight attribute="title" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="summary" hit={props.hit} />
      </div>
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default Hit;
