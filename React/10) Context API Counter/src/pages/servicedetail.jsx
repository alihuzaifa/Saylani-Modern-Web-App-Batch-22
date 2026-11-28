import { useParams } from "react-router";

const ServiceDetail = () => {
  const { serviceId } = useParams();

  return <>Service Number {serviceId}</>;
};

export default ServiceDetail;
