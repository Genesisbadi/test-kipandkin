export default function Twitter({ ...props }) {
  const { color, width, height } = props;
  return (
    <>
      <svg
        version="1.1"
        width={width || "512"}
        height={height || "512"}
        x="0"
        y="0"
        viewBox="0 0 1226.37 1226.37"
      >
        <g>
          <path
            d="M727.348 519.284 1174.075 0h-105.86L680.322 450.887 370.513 0H13.185l468.492 681.821L13.185 1226.37h105.866l409.625-476.152 327.181 476.152h357.328L727.322 519.284zM582.35 687.828l-47.468-67.894-377.686-540.24H319.8l304.797 435.991 47.468 67.894 396.2 566.721H905.661L582.35 687.854z"
            fill="#ffffff"
            opacity="1"
          ></path>
        </g>
      </svg>
    </>
  );
}
