import { getSite404Message } from '../../../config/messages/selectors';

const NotFoundPage = () => {
  return <h1>{getSite404Message()}</h1>;
};

export default NotFoundPage;
