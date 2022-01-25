import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ChatroomSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#363952" highlightColor="#5c5e74">
      <Skeleton wrapper={Wrapper} count={3} height={50} />
    </SkeletonTheme>
  );
};

export const TitleSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#363952" highlightColor="#5c5e74">
      <Skeleton wrapper={Wrapper} count={1} height={35} width={200} />
    </SkeletonTheme>
  );
};

export const UserSkeleton = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "35px 1fr",
        placeItems: "center",
        gap: ".5rem",
      }}
    >
      <SkeletonTheme baseColor="#363952" highlightColor="#5c5e74">
        <Skeleton circle={true} width={35} height={35} />
        <Skeleton height={35} width={150} />
      </SkeletonTheme>
    </div>
  );
};

export const UsersSkeleton = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "48px 1fr",
      }}
    >
      <SkeletonTheme baseColor="#363952" highlightColor="#5c5e74">
        <Skeleton
          wrapper={CircleWrapper}
          circle={true}
          width={40}
          height={40}
        />
        <Skeleton wrapper={Wrapper} height={44} />
        <Skeleton
          wrapper={CircleWrapper}
          circle={true}
          width={40}
          height={40}
        />
        <Skeleton wrapper={Wrapper} height={44} />
        <Skeleton
          wrapper={CircleWrapper}
          circle={true}
          width={40}
          height={40}
        />
        <Skeleton wrapper={Wrapper} height={44} />
      </SkeletonTheme>
    </div>
  );
};

export const ChatSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#363952" highlightColor="#5c5e74">
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          display: "grid",
          gap: ".5rem",
          gridTemplateColumns: "38px 1fr",
          marginBottom: ".5rem",
          marginRight: "42px",
        }}
      >
        <div style={{ gridRow: "1/3" }}>
          <Skeleton circle={true} width={38} height={38} />
        </div>
        <Skeleton height={50} />
        <div style={{ maxWidth: "200px" }}>
          <Skeleton height={50} />
        </div>
      </div>
      <div
        style={{
          maxWidth: "700px",
          width: "100%",
          display: "grid",
          gap: ".5rem",
          gridTemplateColumns: "1fr 38px",
          marginLeft: "auto",
          marginBottom: ".5rem",
        }}
      >
        <Skeleton height={50} />
        <div style={{ gridRow: "1/3", gridColumn: "2/3" }}>
          <Skeleton circle={true} width={38} height={38} />
        </div>
        <div style={{ maxWidth: "15%", marginLeft: "auto", width: "100%" }}>
          <Skeleton height={50} />
        </div>
        <div style={{ maxWidth: "50%", marginLeft: "auto", width: "100%" }}>
          <Skeleton height={50} />
        </div>
      </div>
      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          display: "grid",
          gap: ".5rem",
          gridTemplateColumns: "38px 1fr",
          marginBottom: ".5rem",
        }}
      >
        <div style={{ gridRow: "1/3" }}>
          <Skeleton circle={true} width={38} height={38} />
        </div>
        <Skeleton height={50} />
        <div style={{ maxWidth: "500px" }}>
          <Skeleton height={300} />
        </div>
      </div>
      <div
        style={{
          maxWidth: "1000px",
          width: "100%",
          display: "grid",
          gap: ".5rem",
          gridTemplateColumns: "1fr 38px",
          marginLeft: "auto",
          marginBottom: ".5rem",
        }}
      >
        <Skeleton height={50} />
        <div style={{ gridRow: "1/3", gridColumn: "2/3" }}>
          <Skeleton circle={true} width={38} height={38} />
        </div>
        <div style={{ maxWidth: "45%", marginLeft: "auto", width: "100%" }}>
          <Skeleton height={50} />
        </div>
      </div>
      <div
        style={{
          maxWidth: "450px",
          width: "100%",
          display: "grid",
          gap: ".5rem",
          gridTemplateColumns: "38px 1fr",
          marginBottom: ".5rem",
        }}
      >
        <div style={{ gridRow: "1/3" }}>
          <Skeleton circle={true} width={38} height={38} />
        </div>
        <Skeleton height={50} />
        <div style={{ maxWidth: "20%" }}>
          <Skeleton height={50} />
        </div>
      </div>
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          display: "grid",
          gap: ".5rem",
          gridTemplateColumns: "1fr 38px",
          marginLeft: "auto",
          marginBottom: ".5rem",
        }}
      >
        <Skeleton height={50} />
        <div style={{ gridRow: "1/3", gridColumn: "2/3" }}>
          <Skeleton circle={true} width={38} height={38} />
        </div>
        <div style={{ maxWidth: "50%", marginLeft: "auto", width: "100%" }}>
          <Skeleton height={50} />
        </div>
        <div style={{ maxWidth: "65%", marginLeft: "auto", width: "100%" }}>
          <Skeleton height={50} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

const Wrapper = ({ children }) => {
  return (
    <div
      style={{
        marginBottom: ".5rem",
      }}
    >
      {children}
    </div>
  );
};

const CircleWrapper = ({ children }) => {
  return (
    <div
      style={{
        marginRight: ".5rem",
        marginTop: "2px",
        display: "inline-block",
      }}
    >
      {children}
    </div>
  );
};
