#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.st/u_resolution;
    vec2 mouse = u_mouse/u_resolution;
    vec2 final = st + mouse;
    gl_FragColor = vec4(final.x,final.y,sin(u_time),1.0);
}
