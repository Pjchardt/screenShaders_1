#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 tile(vec2 _st, vec2 _zoom){
    _st *= _zoom;
    return fract(_st);
}

vec2 scale(vec2 _st, float scale)
{
    _st -= .5;
    _st *= scale;
    _st += .5;
    return _st;
}

float rand (vec2 i) {
    return fract(sin(dot(i, vec2(12.9898,78.233)))*43758.5453123);
}

float noise (float x) {
  float i = floor(x);  // integer
  float f = fract(x);  // fraction
  vec2 v = vec2(i,i);
  float u = f * f * (3.0 - 2.0 * f ); // custom cubic curve
  return mix(rand(v), rand(v + 1.0), u); // using it in the interpolation
}

float mrs_circle(float _radius, vec2 _dist, float _dist_scalar){
  return (1.-smoothstep(_radius-(_radius*0.01), _radius+(_radius*0.01), dot(_dist,_dist)*_dist_scalar));
}

void main() {
    vec2 st = gl_FragCoord.st/u_resolution;

    st = tile(st,  vec2(4.0));
    st = scale(st, 1.0 + sin(u_time) * .05);

    vec2 st_center = (st * 2.0) - 1.0;
    float stx_ratio = st.x * u_resolution.x/u_resolution.y;

    float frequency = 10.0;
    vec2 dist = vec2(stx_ratio,st.y) -vec2(0.5*u_resolution.x/u_resolution.y,.5);
    float angle = degrees(atan(st_center.x/st_center.y))+90;
    if (st_center.y < 0) {
      angle += 180;
    }
    angle /= 360.0;
    angle*=frequency;

    float radius;
    if (angle > frequency-1.0) {
      float one = .2 + noise(angle-u_time) * .4;
      float two = .2 + noise(0.0-u_time) * .4;
      radius = mix(one, two, 1.0-(frequency-angle));
    }
    else {
        radius = .2 + noise(angle-u_time) * .4;
    }

    angle *= 8.0;
    radius += .25 + ((noise(angle+u_time)*2.0)-1.0) * .2;

    float f = mrs_circle(radius, dist, 4.0) - mrs_circle(radius, dist, 64.0);
    float red = f * radius - .1;;
    float green = f*.1;
    float blue = f*.5;
  	gl_FragColor = vec4(vec3(red, green, blue), 1.0 );
}
