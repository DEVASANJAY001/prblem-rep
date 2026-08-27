import React, { useEffect, useRef } from "react";

export const BackgroundShader: React.FC<{ className?: string }> = ({
  className = "absolute inset-0 w-full h-full pointer-events-none z-0",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    const vs = `
      attribute vec2 position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      void main() {
        vec2 uv = v_texCoord;
        
        // Soft moving fluid blobs
        float blob1 = sin(uv.x * 2.2 + u_time * 0.45) * cos(uv.y * 2.8 - u_time * 0.35);
        float blob2 = cos(uv.x * 3.8 - u_time * 0.28) * sin(uv.y * 2.4 + u_time * 0.55);
        
        // Mouse influence
        vec2 mouseNorm = u_mouse / max(u_resolution, vec2(1.0, 1.0));
        float distToMouse = length(uv - mouseNorm);
        float mouseBlob = exp(-distToMouse * 4.0) * 0.3;
        
        // Material theme primary blue: #003bcb / #2554f0 (vec3(0.145, 0.329, 0.941))
        vec3 color1 = vec3(0.145, 0.329, 0.941); 
        // Secondary soft sky/cyan/purple tint
        vec3 color2 = vec3(0.72, 0.82, 1.0);
        // Tertiary warm ember touch
        vec3 color3 = vec3(0.44, 0.95, 0.65);
        
        float mask1 = smoothstep(-0.5, 0.5, blob1 + blob2 + mouseBlob);
        vec3 finalColor = mix(color1, color2, mask1);
        finalColor = mix(finalColor, color3, sin(u_time * 0.2 + uv.x) * 0.15);
        
        // Refined opacity for modern backdrop
        gl_FragColor = vec4(finalColor, 0.07 + 0.05 * mask1);
      }
    `;

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.warn(glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vs);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fs);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        mouseX = e.clientX - rect.left;
        mouseY = rect.height - (e.clientY - rect.top);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    function resize() {
      if (!canvas) return;
      const w = canvas.parentElement?.clientWidth || window.innerWidth;
      const h = canvas.parentElement?.clientHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        if (resolutionLocation) {
          gl.uniform2f(resolutionLocation, w, h);
        }
      }
    }

    const resizeObserver = new ResizeObserver(() => resize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    resize();

    const startTime = performance.now();

    function render() {
      const elapsed = (performance.now() - startTime) * 0.001;
      if (timeLocation) gl.uniform1f(timeLocation, elapsed);
      if (mouseLocation) gl.uniform2f(mouseLocation, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={className}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
