import { FC, useEffect, useState } from "react";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";

interface withFetchProps<P> {
  data: P | null;
}

export default function withFetch<T, P>(
  WrappedComponent: FC<T & withFetchProps<P>>,
  dataUrl: string
) {
  return (props: Omit<T, keyof T>) => {
    const [data, setData] = useState<P | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(dataUrl);
          setData(response.data);
        } catch (err: any) {
          setError(
            err.message || "Something went wrong. Please try again later"
          );
        }
      };

      fetchData();
    }, []);

    return error ? (
      <ErrorMessage msg={error} />
    ) : (
      data && <WrappedComponent {...(props as T)} data={data} />
    );
  };
}
